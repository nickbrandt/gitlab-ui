import { mount } from '@vue/test-utils';
import { BDropdown } from 'bootstrap-vue';
import Dropdown from '../../../components/base/dropdown/dropdown.vue';
import { waitRAF } from '../../test_utils';

const MockBDropdown = {
  extends: BDropdown,
  methods: {
    hide: jest.fn(),
  },
};

describe('Dropdown component', () => {
  let wrapper;

  const constructor = props => {
    wrapper = mount(Dropdown, {
      attachToDocument: true,
      ...props,
    });
  };

  describe('default', () => {
    const originalCreateRange = document.createRange;

    beforeEach(() => {
      // JSDOM does not support createRange yet.
      // Bootstrap's spec seems to be polyfilling the same way
      // https://github.com/bootstrap-vue/bootstrap-vue/blob/master/src/components/dropdown/dropdown.spec.js#L11
      document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: {
          nodeName: 'BODY',
          ownerDocument: document,
        },
      });
    });
    afterEach(() => {
      document.createRange = originalCreateRange;
      wrapper.destroy();
    });

    it('renders a BDropdown', () => {
      constructor();
      expect(wrapper.find(BDropdown).exists()).toBe(true);
    });

    it('hide method does hide the dropdown', async done => {
      constructor();
      wrapper.find('.dropdown-toggle').trigger('click');
      await wrapper.vm.$nextTick();
      // Vue has rendered the Dropdown. However, browser
      // hasn't completed painting yet. Hence waiting until
      // the next Animation frame is done after Vue's nextTick
      await waitRAF();
      expect(wrapper.classes('show')).toBe(true);
      wrapper.vm.hide();
      await wrapper.vm.$nextTick();
      expect(wrapper.classes('show')).toBe(false);
      done();
    });

    it('hide method called dropdowns hide method', () => {
      constructor({
        stubs: {
          BDropdown: MockBDropdown,
        },
      });
      wrapper.vm.hide(true);
      expect(MockBDropdown.methods.hide).toHaveBeenCalledWith(true);
    });
  });
});
