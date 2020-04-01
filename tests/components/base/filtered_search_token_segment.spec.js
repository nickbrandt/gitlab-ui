import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import GlFilteredSearchTokenSegment from '../../../src/components/base/filtered_search/filtered_search_token_segment.vue';

const OPTIONS = [{ value: '=' }, { value: '!=' }];

describe('Filtered search token segment', () => {
  let wrapper;

  beforeAll(() => {
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = jest.fn();
    }
  });

  afterAll(() => {
    if (HTMLElement.prototype.scrollIntoView.mock) {
      delete HTMLElement.prototype.scrollIntoView;
    }
  });

  let alignSuggestionsMock;
  let suggestionsMock;

  const createComponent = props => {
    alignSuggestionsMock = jest.fn();
    suggestionsMock = {
      methods: {
        nextItem: jest.fn(),
        prevItem: jest.fn(),
        getValue: jest.fn(),
      },
      template: `<div class="ololosha"><slot></slot></div>`,
    };

    wrapper = shallowMount(GlFilteredSearchTokenSegment, {
      propsData: props,
      provide: {
        portalName: 'fakePortal',
        alignSuggestions: alignSuggestionsMock,
      },
      stubs: {
        Portal: { template: '<div><slot></slot></div>' },
        GlFilteredSearchSuggestionList: suggestionsMock,
      },
    });
  };

  const createWrappedComponent = ({ value, ...otherProps } = {}) => {
    // We need to create fake parent due to https://github.com/vuejs/vue-test-utils/issues/1140
    const fakeParent = {
      inheritAttrs: false,
      data: () => ({ value }),
      components: {
        GlFilteredSearchTokenSegment,
      },
      provide: {
        portalName: 'fakePortal',
        alignSuggestions: () => {},
      },
      template:
        '<gl-filtered-search-token-segment v-bind="$attrs" v-model="value" v-on="$listeners" />',
    };

    wrapper = shallowMount(fakeParent, {
      propsData: otherProps,
      stubs: { GlFilteredSearchTokenSegment },
    });
  };

  it('emits activate on left button click if inactive', () => {
    createComponent({ value: '' });

    wrapper.trigger('mousedown.left');

    return nextTick().then(() => {
      expect(wrapper.emitted().activate).toHaveLength(1);
    });
  });

  it('ignores mousedown if active', () => {
    createComponent({ value: '', active: true });

    wrapper.trigger('mousedown');

    return nextTick().then(() => {
      expect(wrapper.emitted().mousedown).toBeUndefined();
    });
  });

  it('selects next suggestion if down arrow is pressed', () => {
    createComponent({ active: true, options: OPTIONS, value: false });
    wrapper.find('input').trigger('keydown', { key: 'ArrowDown' });

    return nextTick().then(() => {
      expect(suggestionsMock.methods.nextItem).toHaveBeenCalled();
    });
  });

  it('selects previous suggestion if down arrow is pressed', () => {
    createComponent({ active: true, options: OPTIONS, value: false });
    wrapper.find('input').trigger('keydown', { key: 'ArrowUp' });

    return nextTick().then(() => {
      expect(suggestionsMock.methods.prevItem).toHaveBeenCalled();
    });
  });

  it('emits submit if Enter is pressed', () => {
    createComponent({ active: true, value: false });
    wrapper.find('input').trigger('keydown', { key: 'Enter' });

    return nextTick().then(() => {
      expect(wrapper.emitted().submit).toHaveLength(1);
    });
  });

  it('emits backspace event if value is empty and Backspace is pressed', () => {
    createComponent({ active: true, value: '' });
    wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    return nextTick().then(() => {
      expect(wrapper.emitted().backspace).toHaveLength(1);
    });
  });

  it('does not emit backspace event if value is not empty and Backspace is pressed', () => {
    createComponent({ active: true, value: 'something' });
    wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    return nextTick().then(() => {
      expect(wrapper.emitted().backspace).toBeUndefined();
    });
  });

  it('invokes custom input handler if provided', () => {
    const customInputKeydownHandler = jest.fn();
    createComponent({
      active: true,
      value: 'something',
      customInputKeydownHandler,
    });
    wrapper.find('input').trigger('keydown', { key: 's' });

    return nextTick().then(() => {
      expect(customInputKeydownHandler).toHaveBeenCalledWith(
        expect.any(Event),
        expect.objectContaining({
          applySuggestion: expect.any(Function),
          inputValue: 'something',
          suggestedValue: undefined,
        })
      );
    });
  });

  it('deactivates when input is blurred', () => {
    createComponent({ active: true, value: 'something' });

    wrapper.find('input').trigger('blur');

    return nextTick().then(() => {
      expect(wrapper.emitted().deactivate).toHaveLength(1);
    });
  });

  it('resets value to previously selected if options are provided and input is invalid', () => {
    const originalValue = '!=';
    createWrappedComponent({
      value: originalValue,
      title: 'Test',
      options: OPTIONS,
      active: true,
    });

    return nextTick()
      .then(() => {
        wrapper.setData({ value: 'invalid' });
        return nextTick();
      })
      .then(() => {
        wrapper.setProps({ active: false });
        return nextTick();
      })
      .then(() => {
        expect(wrapper.find(GlFilteredSearchTokenSegment).emitted().input[0][0]).toBe(
          originalValue
        );
      });
  });
});
