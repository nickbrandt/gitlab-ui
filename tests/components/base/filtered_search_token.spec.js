import { observable, nextTick } from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import GlFilteredSearchToken from '../../../src/components/base/filtered_search/filtered_search_token.vue';
import GlFilteredSearchTokenSegment from '../../../src/components/base/filtered_search/filtered_search_token_segment.vue';

describe('Filtered search token', () => {
  let wrapper;

  const findOperatorSegment = () => wrapper.findAll(GlFilteredSearchTokenSegment).at(0);
  const findDataSegment = () => wrapper.findAll(GlFilteredSearchTokenSegment).at(1);

  const defaultProps = {
    title: 'testTitle',
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

  it('activates data segment when title is clicked', () => {
    createComponent({ active: true, value: { operator: '=' } });

    wrapper.find('.gl-filtered-search-token-type').vm.$emit('click');

    return nextTick().then(() => {
      expect(findDataSegment().props().active).toBe(true);
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
    createComponent({ active: true, value: { operator: '=', data: ' something' } });

    findDataSegment().vm.$emit('backspace');

    return nextTick().then(() => {
      expect(findOperatorSegment().props().active).toBe(true);
    });
  });

  it.each(['complete', 'split', 'submit'])(
    'passes-through %s event when data segment emits it',
    event => {
      createComponent({ active: true, value: { operator: '=', data: ' something' } });

      findDataSegment().vm.$emit(event);

      return nextTick().then(() => {
        expect(wrapper.emitted(event)).toHaveLength(1);
      });
    }
  );

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
        propsData: { title: 'Demo', ...props },
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
