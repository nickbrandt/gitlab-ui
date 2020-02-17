import Vue from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import PortalVue from 'portal-vue';
import GlFilteredSearchToken from '../../../src/components/base/filtered_search/filtered_search_token.vue';
import GlFilteredSearchSuggestion from '../../../src/components/base/filtered_search/filtered_search_suggestion.vue';

const localVue = createLocalVue();
localVue.use(PortalVue);

describe('Filtered search token', () => {
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
  };

  let alignSuggestionsMock;
  let suggestionsMock;

  const createComponent = props => {
    alignSuggestionsMock = jest.fn();
    suggestionsMock = {
      methods: { nextItem: jest.fn(), prevItem: jest.fn(), getValue: jest.fn() },
      template: `<div><slot></slot></div>`,
    };

    wrapper = shallowMount(GlFilteredSearchToken, {
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

  const findTypeToken = () => wrapper.find('.gl-filtered-search-token-type');
  const findOperatorToken = () => wrapper.find('.gl-filtered-search-token-operator');
  const findDataToken = () => wrapper.find('.gl-filtered-search-token-data');

  it('renders tokens in inactive mode', () => {
    createComponent({ value: { operator: '=', data: 'test-value' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders token and input with value in active mode', () => {
    createComponent({ value: { operator: '=', data: 'test-value' }, active: true });
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

  it('emits deactivate event when operator is blurred', () => {
    createComponent({ placeholder: 'placeholder-stub', active: true });
    return wrapper.vm.$nextTick().then(() => {
      wrapper.find({ ref: 'operatorInput' }).trigger('blur');
      return wrapper.vm.$nextTick();
    });
  });

  it('renders suggestions when operator is active', () => {
    const operators = [{ operator: 'a' }, { operator: 'b' }, { operator: 'c' }];
    createComponent({ active: true, operators });
    expect(wrapper.find(suggestionsMock).exists()).toBe(true);
    expect(wrapper.findAll(GlFilteredSearchSuggestion).length).toBe(operators.length);
  });

  it('jumps to data segment when enter is pressed', () => {
    createComponent({ active: true });
    suggestionsMock.methods.getValue.mockReturnValue('=');

    return wrapper.vm
      .$nextTick()
      .then(() => {
        wrapper.find('input').trigger('keydown.enter', { key: 'Enter' });
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        expect(wrapper.find({ ref: 'operatorInput' }).exists()).toBe(false);
        expect(wrapper.find({ ref: 'dataInput' }).exists()).toBe(true);
      });
  });

  it('emits submit event if no suggestions are available and Enter is pressed', () => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });
    wrapper.find('input').trigger('keydown', { key: 'Enter' });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().submit.length).toBe(1);
    });
  });

  it('emits complete event if suggestion is selected and Enter is pressed', () => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });
    suggestionsMock.methods.getValue.mockReturnValue('other');
    wrapper.find('input').trigger('keydown', { key: 'Enter' });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().complete.length).toBe(1);
    });
  });

  it('emits replace event if value is empty and Backspace is pressed', () => {
    createComponent({ active: true });
    wrapper.find('input').trigger('keydown', {
      key: 'Backspace',
    });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().replace.length).toBe(1);
    });
  });

  it.each`
    token         | fn                   | ref
    ${'type'}     | ${findTypeToken}     | ${'dataInput'}
    ${'operator'} | ${findOperatorToken} | ${'operatorInput'}
    ${'data'}     | ${findDataToken}     | ${'dataInput'}
  `('Activates $ref when $token is clicked', ({ fn, ref }) => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });
    if (fn().exists()) {
      fn().vm.$emit('click');
    }
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find({ ref }).exists()).toBe(true);
    });
  });

  it('emits destroy if blurred with empty data', () => {
    createComponent({ active: true });
    wrapper.setProps({ active: false });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().destroy.length).toBe(1);
    });
  });

  it('jumps to operator when Backspace pressed in data segment', () => {
    createComponent({ active: true, value: { operator: '=', data: '' } });
    findTypeToken().vm.$emit('click');
    return wrapper.vm
      .$nextTick()
      .then(() => {
        wrapper.find('input').trigger('keydown', { key: 'Backspace' });
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        expect(wrapper.find({ ref: 'operatorInput' }).exists()).toBe(true);
      });
  });

  it('emits activate if clicked on segment when not active', () => {
    createComponent({ value: { operator: '=', data: 'something' } });
    findDataToken().vm.$emit('click');
    expect(wrapper.emitted().activate.length).toBe(1);
  });

  it('resets operator value if switched to invalid', () => {
    createComponent({ active: true, value: Vue.observable({ operator: '!=', data: 'something' }) });

    return wrapper.vm
      .$nextTick()
      .then(() => {
        findOperatorToken().vm.$emit('click');
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        wrapper.find('input').setValue('!');
        wrapper.find('input').trigger('blur');
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        const [[lastEmit]] = [...wrapper.emitted().input].reverse();
        expect(lastEmit.operator).toBe('!=');
      });
  });

  it('jumps to data segment when space is pressed in operator area', () => {
    createComponent({ active: true });
    suggestionsMock.methods.getValue.mockReturnValue('=');

    return wrapper.vm
      .$nextTick()
      .then(() => {
        wrapper.find('input').trigger('keydown', { key: ' ' });
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        expect(wrapper.find({ ref: 'dataInput' }).exists()).toBe(true);
      });
  });

  it('applies default operator, when non-operator input provided', () => {
    createComponent({ active: true });
    suggestionsMock.methods.getValue.mockReturnValue('|');

    return wrapper.vm
      .$nextTick()
      .then(() => {
        wrapper.find('input').trigger('keydown', { key: 'q' });
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        const [[value]] = wrapper.emitted().input;
        expect(value.operator).toBe('|');
      });
  });

  it('does not jump to data segment when data has value', () => {
    createComponent({ active: true, value: { operator: '', data: 'something' } });
    suggestionsMock.methods.getValue.mockReturnValue('|');
    findOperatorToken().vm.$emit('click');

    return wrapper.vm
      .$nextTick()
      .then(() => {
        wrapper.find('input').trigger('keydown', { key: 'q' });
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        expect(wrapper.find({ ref: 'operatorInput' }).exists()).toBe(true);
      });
  });

  describe('with options provided', () => {
    beforeEach(() => {
      createComponent({
        active: true,
        value: Vue.observable({
          operator: '',
          data: true,
        }),
        options: [
          { icon: 'eye-slash', value: true, title: 'Yes' },
          { icon: 'eye', value: false, title: 'No' },
        ],
      });
      return wrapper.vm.$nextTick();
    });

    it('displays option title instead of value', () => {
      expect(wrapper.find('input').element.value).toBe('Yes');
    });

    it('maps title back to value', () => {
      wrapper.find('input').setValue('No');
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.emitted().input[0][0].data).toBe(false);
      });
    });

    it('resets value to previous state with invalid input', () => {
      wrapper.find('input').setValue('N');
      wrapper.find('input').trigger('blur');
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.emitted().input[0][0].data).toBe(true);
      });
    });
  });
});
