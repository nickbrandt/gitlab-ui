import { observable, nextTick } from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import GlFilteredSearchToken from '../../../src/components/base/filtered_search/filtered_search_token.vue';
import GlFilteredSearchTokenSegment from '../../../src/components/base/filtered_search/filtered_search_token_segment.vue';

describe('Filtered search token', () => {
  let wrapper;

  const findTitleSegment = () => wrapper.findAll(GlFilteredSearchTokenSegment).at(0);
  const findOperatorSegment = () => wrapper.findAll(GlFilteredSearchTokenSegment).at(1);
  const findDataSegment = () => wrapper.findAll(GlFilteredSearchTokenSegment).at(2);
  const availableTokens = [
    {
      type: 'compatible1',
      dataType: 'compatible',
      title: 'test1-foo',
      token: 'stub',
      icon: 'eye',
    },
    {
      type: 'complatible2',
      dataType: 'compatible',
      title: 'test2-bar',
      token: 'stub',
      icon: 'eye',
    },
    { type: 'incompatible', title: 'test3-baz', token: 'stub', icon: 'eye' },
  ];

  const defaultProps = {
    config: { title: 'testTitle' },
    availableTokens,
  };

  const createComponent = props => {
    wrapper = shallowMount(GlFilteredSearchToken, {
      propsData: { ...defaultProps, ...props },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  describe('when activated', () => {
    it('emits activate when operator segment is clicked', () => {
      createComponent();
      findOperatorSegment().vm.$emit('activate');

      return nextTick().then(() => {
        expect(wrapper.emitted().activate).toHaveLength(1);
      });
    });

    it('activates operator segment if value is empty', () => {
      createComponent({ active: true });

      expect(findOperatorSegment().props().active).toBe(true);
    });

    it('activates data segment if value is not empty', () => {
      createComponent({ active: true, value: { operator: '=', data: 'something' } });

      expect(findDataSegment().props().active).toBe(true);
    });
  });

  it('activates operator segment when clicked', () => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });

    findOperatorSegment().vm.$emit('activate');

    return nextTick().then(() => {
      expect(findOperatorSegment().props().active).toBe(true);
    });
  });

  it('activates data segment when clicked', () => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });

    findOperatorSegment().vm.$emit('activate');

    return nextTick().then(() => {
      expect(findOperatorSegment().props().active).toBe(true);
    });
  });

  it('activates title segment when title is clicked', () => {
    createComponent({ active: true, value: { operator: '=' } });

    findTitleSegment().vm.$emit('activate');

    return nextTick().then(() => {
      expect(findTitleSegment().props().active).toBe(true);
    });
  });

  it('replaces itself when value is empty and backspace is pressed', () => {
    createComponent({ active: true, value: { operator: '', data: '' } });

    findOperatorSegment().vm.$emit('backspace');

    return nextTick().then(() => {
      expect(wrapper.emitted().replace).toHaveLength(1);
    });
  });

  it('ignores backspace when value is not empty and backspace is pressed', () => {
    createComponent({ active: true, value: { operator: '', data: 'something' } });

    findOperatorSegment().vm.$emit('backspace');

    return nextTick().then(() => {
      expect(wrapper.emitted().replace).toBeUndefined();
    });
  });

  it('jumps to data segment when operator segment is completed', () => {
    createComponent({ active: true, value: { operator: '' } });

    findOperatorSegment().vm.$emit('input', '=');
    findOperatorSegment().vm.$emit('complete');

    return nextTick().then(() => {
      expect(findDataSegment().props().active).toBe(true);
    });
  });

  it.each`
    segment       | selector
    ${'operator'} | ${findOperatorSegment}
    ${'data'}     | ${findDataSegment}
  `('deactivates when %segment is deactivated', ({ selector }) => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });
    selector().vm.$emit('deactivate');

    return nextTick().then(() => {
      expect(wrapper.emitted().deactivate).toHaveLength(1);
    });
  });

  it('emits destroy when deactivated and value is empty', () => {
    createComponent({ active: true });

    return nextTick()
      .then(() => {
        wrapper.setProps({ active: false });
        return nextTick();
      })
      .then(() => {
        expect(wrapper.emitted().destroy).toHaveLength(1);
      });
  });

  it('activates operator segment when backspace is pressed in data segmented', () => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });

    findDataSegment().vm.$emit('backspace');

    return nextTick().then(() => {
      expect(findOperatorSegment().props().active).toBe(true);
    });
  });

  it.each(['complete', 'split', 'submit'])(
    'passes-through %s event when data segment emits it',
    event => {
      createComponent({ active: true, value: { operator: '=', data: 'something' } });

      findDataSegment().vm.$emit(event);

      return nextTick().then(() => {
        expect(wrapper.emitted(event)).toHaveLength(1);
      });
    }
  );

  it('keeps value when replaced by compatible token', () => {
    const originalValue = { operator: '=', data: 'something' };
    createComponent({
      active: true,
      value: originalValue,
      config: availableTokens[0],
    });

    findTitleSegment().vm.$emit('complete', availableTokens[1].title);

    return nextTick().then(() => {
      expect(wrapper.emitted().replace).toHaveLength(1);
      expect(wrapper.emitted().replace[0][0].value).toStrictEqual(originalValue);
    });
  });

  it('resets value when replaced by incompatible token', () => {
    const originalValue = { operator: '=', data: 'something' };
    createComponent({
      active: true,
      value: originalValue,
      config: availableTokens[0],
    });

    findTitleSegment().vm.$emit('complete', availableTokens[2].title);

    return nextTick().then(() => {
      expect(wrapper.emitted().replace).toHaveLength(1);
      expect(wrapper.emitted().replace[0][0].value).toStrictEqual({ data: '' });
    });
  });

  describe('integration tests', () => {
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

    const mountComponent = props => {
      wrapper = mount(GlFilteredSearchToken, {
        provide: {
          portalName: 'fake target',
          alignSuggestions: function fakeAlignSuggestions() {},
        },
        stubs: {
          Portal: {
            template: '<div><slot></slot></div>',
          },
          GlFilteredSearchSuggestionList: {
            template: '<div></div>',
            methods: {
              getValue: () => '=',
            },
          },
        },
        propsData: { ...defaultProps, ...props },
      });
    };

    it('emits close event when data token is closed', () => {
      mountComponent({ value: { operator: '=', data: 'something' } });
      const closeWrapper = wrapper.find('.gl-token-close');
      closeWrapper.element.closest = () => closeWrapper.element;
      closeWrapper.trigger('mousedown');

      return nextTick().then(() => {
        expect(wrapper.emitted().destroy).toHaveLength(1);
      });
    });

    it('jumps to data segment and applies selection if no match is available for key and data is empty', () => {
      mountComponent({ active: true, value: observable({ operator: '', data: '' }) });
      return nextTick()
        .then(() => {
          wrapper.find('input').trigger('keydown', { key: 'q' });
          return nextTick();
        })
        .then(() => {
          expect(wrapper.emitted().input[0][0].operator).toBe('=');
          expect(findDataSegment().props().active).toBe(true);
        });
    });

    it('jumps to data segment and applies selection when space is pressed', () => {
      mountComponent({ active: true, value: observable({ operator: '!=', data: '' }) });
      return nextTick()
        .then(() => {
          wrapper.find('input').trigger('keydown', { key: ' ' });
          return nextTick();
        })
        .then(() => {
          expect(wrapper.emitted().input[0][0].operator).toBe('=');
          expect(findDataSegment().props().active).toBe(true);
        });
    });
  });
});
