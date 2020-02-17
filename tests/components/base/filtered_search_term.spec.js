import { shallowMount, createLocalVue } from '@vue/test-utils';
import PortalVue from 'portal-vue';
import FilteredSearchTerm from '../../../src/components/base/filtered_search/filtered_search_term.vue';
import GlFilteredSearchSuggestion from '../../../src/components/base/filtered_search/filtered_search_suggestion.vue';
import { TERM_TOKEN_TYPE } from '../../../src/components/base/filtered_search/filtered_search_utils';

const localVue = createLocalVue();
localVue.use(PortalVue);

const availableTokens = [
  { type: 'foo', hint: 'test1-foo', token: 'stub', icon: 'eye' },
  { type: 'foo', hint: 'test2-bar', token: 'stub', icon: 'eye' },
  { type: 'foo', hint: 'test1-baz', token: 'stub', icon: 'eye' },
];

describe('Filtered search term', () => {
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
    availableTokens: [],
  };

  let alignSuggestionsMock;
  let suggestionsMock;

  const createComponent = props => {
    alignSuggestionsMock = jest.fn();
    suggestionsMock = {
      methods: { nextItem: jest.fn(), prevItem: jest.fn(), getValue: jest.fn() },
      template: `<div><slot></slot></div>`,
    };

    wrapper = shallowMount(FilteredSearchTerm, {
      propsData: { ...defaultProps, ...props },
      provide: {
        alignSuggestions: alignSuggestionsMock,
        portalName: 'stub',
      },
      localVue,
      stubs: {
        GlFilteredSearchSuggestionList: suggestionsMock,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('renders value in inactive mode', () => {
    createComponent({ value: { data: 'test-value' } });
    expect(wrapper.text()).toContain('test-value');
  });

  it('renders input with value in active mode', () => {
    createComponent({ value: { data: 'test-value' }, active: true });
    expect(wrapper.find('input').element.value).toBe('test-value');
  });

  it('renders input with placeholder if placeholder prop is provided', () => {
    createComponent({ placeholder: 'placeholder-stub' });
    expect(wrapper.find('input').attributes('placeholder')).toBe('placeholder-stub');
  });

  it('focuses and scrolls to input on activation', () => {
    createComponent({ placeholder: 'placeholder-stub', availableTokens });
    wrapper.setProps({ active: true });
    jest.spyOn(HTMLInputElement.prototype, 'focus');
    jest.spyOn(HTMLInputElement.prototype, 'scrollIntoView');
    return wrapper.vm.$nextTick().then(() => {
      expect(HTMLInputElement.prototype.focus).toHaveBeenCalled();
      expect(HTMLInputElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  it('aligns suggestions on activation', () => {
    createComponent({ availableTokens });
    wrapper.setProps({ active: true });
    return wrapper.vm.$nextTick().then(() => {
      expect(alignSuggestionsMock).toHaveBeenCalledWith(wrapper.find('input').element);
    });
  });

  it('emits deactivate event when blurred', () => {
    createComponent({ placeholder: 'placeholder-stub', active: true });
    wrapper.find('input').trigger('blur');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().deactivate).toBeDefined();
    });
  });

  it('renders suggestions when token is active', () => {
    createComponent({ availableTokens, active: true });
    expect(wrapper.find(suggestionsMock).exists()).toBe(true);
    expect(wrapper.findAll(GlFilteredSearchSuggestion).length).toBe(availableTokens.length);
  });

  it('filters suggestions by input', () => {
    createComponent({ availableTokens, active: true, value: { data: 'test1' } });
    wrapper.find('input').setValue('test1');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.findAll(GlFilteredSearchSuggestion).length).toBe(2);
    });
  });

  it('emits submit event if no suggestion is selected and Enter is pressed', () => {
    createComponent({ availableTokens, active: true });
    wrapper.find('input').trigger('keydown', { key: 'Enter' });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().submit.length).toBe(1);
    });
  });

  it('emits submit event if no suggestions are available and Enter is pressed', () => {
    createComponent({ availableTokens, active: true, value: { data: 'other' } });
    wrapper.find('input').trigger('keydown', { key: 'Enter' });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().submit.length).toBe(1);
    });
  });

  it('emits replace event if suggestion is selected and Enter is pressed', () => {
    createComponent({ availableTokens, active: true });
    suggestionsMock.methods.getValue.mockReturnValue('token-type');
    wrapper.find('input').trigger('keydown', { key: 'Enter' });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().replace.length).toBe(1);
      expect(wrapper.emitted().replace[0]).toEqual([{ type: 'token-type' }]);
    });
  });

  it('emits destroy event if value is empty and Backspace is pressed', () => {
    createComponent({ availableTokens, active: true });
    wrapper.find('input').trigger('keydown', { key: 'Backspace' });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().destroy.length).toBe(1);
    });
  });

  it('emits create when value is changed to ending with single space', () => {
    createComponent({ availableTokens, active: true });
    wrapper.setProps({ value: { data: 'test ' } });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().create.length).toBe(1);
      expect(wrapper.emitted().create[0]).toEqual([
        [{ type: TERM_TOKEN_TYPE, value: { data: '' } }],
      ]);
    });
  });

  it('does not emit create when value is changed to contain multiple spaces and has unclosed quotes', () => {
    createComponent({ availableTokens, active: true });
    wrapper.setProps({ value: { data: 'foo "bar baz' } });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().create).toBeUndefined();
    });
  });

  it('emits create and truncates current token when value is changed to contain multiple spaces and has no quotes', () => {
    createComponent({ availableTokens, active: true });
    wrapper.setProps({ value: { data: 'foo bar baz' } });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().create[0]).toEqual([
        [
          { type: TERM_TOKEN_TYPE, value: { data: 'bar' } },
          { type: TERM_TOKEN_TYPE, value: { data: 'baz' } },
        ],
      ]);
      const lastEmit = wrapper.emitted().input[wrapper.emitted().input.length - 1];
      expect(lastEmit).toEqual([{ data: 'foo' }]);
    });
  });

  it('emits create and truncates current token when value is changed to contain multiple spaces and has paired quotes', () => {
    createComponent({ availableTokens, active: true });
    wrapper.setProps({ value: { data: '"foo bar" baz' } });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().create[0]).toEqual([
        [{ type: TERM_TOKEN_TYPE, value: { data: 'baz' } }],
      ]);
      const lastEmit = wrapper.emitted().input[wrapper.emitted().input.length - 1];
      expect(lastEmit).toEqual([{ data: '"foo bar"' }]);
    });
  });

  it('does not emit create event if there are no spaces in input', () => {
    createComponent({ availableTokens, active: true });
    wrapper.setProps({ value: { data: 'foo' } });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().create).toBeUndefined();
    });
  });

  it('selects next suggestion if down arrow is pressed', () => {
    createComponent({ availableTokens, active: true });
    wrapper.find('input').trigger('keydown', { key: 'ArrowDown' });
    expect(suggestionsMock.methods.nextItem).toHaveBeenCalled();
  });

  it('selects previous suggestion if up arrow is pressed', () => {
    createComponent({ availableTokens, active: true });
    wrapper.find('input').trigger('keydown', { key: 'ArrowUp' });
    expect(suggestionsMock.methods.prevItem).toHaveBeenCalled();
  });
});
