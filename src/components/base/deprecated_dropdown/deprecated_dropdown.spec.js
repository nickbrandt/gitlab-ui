import { mount } from '@vue/test-utils';
import { BDropdown } from 'bootstrap-vue';
import Dropdown from './deprecated_dropdown.vue';
import { waitForAnimationFrame } from '~/utils/test_utils';

const MockBDropdown = {
  extends: BDropdown,
  methods: {
    hide: jest.fn(),
  },
};

describe('Dropdown component', () => {
  let wrapper;

  const createComponent = (props) => {
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
      // https://github.com/bootstrap-vue/bootstrap-vue/blob/v2.0.0-rc.27/src/components/dropdown/dropdown.spec.js#L11
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
      createComponent();
      expect(wrapper.find(BDropdown).exists()).toBe(true);
    });

    it('hide method does hide the dropdown', () => {
      createComponent();
      wrapper.find('.dropdown-toggle').trigger('click');
      // Bootstrap dropdown waits for the next animation frame
      // before it is rendered. Hence we need to wait for it as well.
      // https://github.com/bootstrap-vue/bootstrap-vue/blob/444d8b0704d11a6e169f4f8559491b9291ee53a5/src/mixins/dropdown.js#L293
      return Promise.all([wrapper.vm.$nextTick(), waitForAnimationFrame()])
        .then(() => {
          expect(wrapper.classes('show')).toBe(true);
          wrapper.vm.hide();
          return wrapper.vm.$nextTick();
        })
        .then(() => {
          expect(wrapper.classes('show')).toBe(false);
        });
    });

    it('hide method called dropdowns hide method', () => {
      createComponent({
        stubs: {
          BDropdown: MockBDropdown,
        },
      });
      wrapper.vm.hide(true);
      expect(MockBDropdown.methods.hide).toHaveBeenCalledWith(true);
    });
  });
});
