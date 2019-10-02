import { mount } from '@vue/test-utils';
import { BDropdown } from 'bootstrap-vue';
import Dropdown from '../../../components/base/dropdown/dropdown.vue';
import { sleep } from '../../test_utils';

const ExtendedBDropdown = {
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
    beforeEach(() => {
      // The dropdown component throws an error when mounted.
      // This hack prevents it from happening.
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
      wrapper.destroy();
    });

    it('renders a BDropdown', () => {
      constructor();
      expect(wrapper.find(BDropdown).exists()).toBe(true);
    });

    it('hide method does hide the dropdown', async done => {
      constructor();
      wrapper.find('.dropdown-toggle').trigger('click');
      await sleep(50);
      expect(wrapper.classes('show')).toBe(true);
      wrapper.vm.hide();
      await sleep(50);
      expect(wrapper.classes('show')).toBe(false);
      done();
    });

    it('hide method called dropdowns hide method', () => {
      constructor({
        stubs: {
          BDropdown: ExtendedBDropdown,
        },
      });
      wrapper.vm.hide(true);
      expect(ExtendedBDropdown.methods.hide).toHaveBeenCalledWith(true);
    });
  });
});
