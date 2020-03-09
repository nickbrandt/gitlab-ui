import { shallowMount, createLocalVue } from '@vue/test-utils';
import PortalVue from 'portal-vue';
import GlFilteredSearchBinaryToken from '../../../src/components/base/filtered_search/filtered_search_binary_token.vue';
import GlFilteredSearchSuggestion from '../../../src/components/base/filtered_search/filtered_search_suggestion.vue';

const localVue = createLocalVue();
localVue.use(PortalVue);

describe('Filtered search binary token', () => {
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

  const defaultProps = {
    title: 'testTitle',
    value: { data: '' },
  };

  let alignSuggestionsMock;
  let suggestionsMock;

  const createComponent = props => {
    alignSuggestionsMock = jest.fn();
    suggestionsMock = {
      methods: { nextItem: jest.fn(), prevItem: jest.fn(), getValue: jest.fn() },
      template: `<div><slot></slot></div>`,
    };

    wrapper = shallowMount(GlFilteredSearchBinaryToken, {
      propsData: { ...defaultProps, ...props },
      provide: {
        alignSuggestions: alignSuggestionsMock,
        portalName: 'stub',
      },
      localVue,
      slots: {
        suggestions: {
          components: {
            GlFilteredSearchSuggestion,
          },
          template: `<div>
            <gl-filtered-search-suggestion value="test1">1</gl-filtered-search-suggestion>
            <gl-filtered-search-suggestion value="test2">2</gl-filtered-search-suggestion>
          </div>`,
        },
      },
      stubs: {
        GlFilteredSearchSuggestionList: suggestionsMock,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('renders tokens in inactive mode', () => {
    createComponent({ value: { data: 'test-value' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders token and input with value in active mode', () => {
    createComponent({ value: { data: 'test-value' }, active: true });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('focuses and scrolls to input on activation', () => {
    createComponent();
    wrapper.setProps({ active: true });
    jest.spyOn(HTMLInputElement.prototype, 'focus');
    jest.spyOn(HTMLInputElement.prototype, 'scrollIntoView');
    return wrapper.vm.$nextTick().then(() => {
      expect(HTMLInputElement.prototype.focus).toHaveBeenCalled();
      expect(HTMLInputElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  it('aligns suggestions on activation', () => {
    createComponent();
    wrapper.setProps({ active: true });
    return wrapper.vm.$nextTick().then(() => {
      expect(alignSuggestionsMock).toHaveBeenCalledWith(wrapper.find('input').element);
    });
  });

  it('emits deactivate event when blurred', () => {
    createComponent({ placeholder: 'placeholder-stub', active: true });
    return wrapper.vm.$nextTick().then(() => {
      wrapper.find('input').trigger('blur');
      return wrapper.vm.$nextTick();
    });
  });

  it('renders suggestions when token is active', () => {
    createComponent({ active: true });
    expect(wrapper.find(suggestionsMock).exists()).toBe(true);
    expect(wrapper.findAll(GlFilteredSearchSuggestion).length).toBe(2);
  });

  it('emits submit event if no suggestion is selected and Enter is pressed', () => {
    createComponent({ active: true });
    wrapper.find('input').trigger('keydown.enter');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().submit.length).toBe(1);
    });
  });

  it('emits submit event if no suggestions are available and Enter is pressed', () => {
    createComponent({ active: true, value: { data: 'other' } });
    wrapper.find('input').trigger('keydown.enter');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().submit.length).toBe(1);
    });
  });

  it('emits token-complete event if suggestion is selected and Enter is pressed', () => {
    createComponent({ active: true });
    suggestionsMock.methods.getValue.mockReturnValue('token-type');
    wrapper.find('input').trigger('keydown.enter');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().complete.length).toBe(1);
    });
  });

  it('emits token-replace event if value is empty and Backspace is pressed', () => {
    createComponent({ active: true });
    wrapper.find('input').trigger('keydown.backspace');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().replace.length).toBe(1);
    });
  });

  it('emits split when value is changed to ending with single space', () => {
    createComponent({ active: true });
    wrapper.setProps({ value: { data: 'test ' } });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().split.length).toBe(1);
      expect(wrapper.emitted().split[0]).toEqual([['']]);
    });
  });

  it('emits split and truncates current token when value is changed to contain multiple spaces', () => {
    createComponent({ active: true });
    wrapper.setProps({ value: { data: 'foo bar baz' } });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().split[0]).toEqual([['bar', 'baz']]);
      expect(wrapper.emitted().input[0]).toEqual([{ data: 'foo' }]);
    });
  });

  it('does not emit token-create event if there are no spaces in input', () => {
    createComponent({ active: true });
    wrapper.setProps({ value: 'foo' });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().create).toBeUndefined();
    });
  });

  it('selects next suggestion if down arrow is pressed', () => {
    createComponent({ active: true });
    wrapper.find('input').trigger('keydown.down');
    expect(suggestionsMock.methods.nextItem).toHaveBeenCalled();
  });

  it('selects previous suggestion if up arrow is pressed', () => {
    createComponent({ active: true });
    wrapper.find('input').trigger('keydown.up');
    expect(suggestionsMock.methods.prevItem).toHaveBeenCalled();
  });
});
