import { shallowMount } from '@vue/test-utils';
import { BCollapse } from 'bootstrap-vue';
import Collapse from '../../../src/components/base/collapse/collapse.vue';

describe('Collapse component', () => {
  const collapseId = 'collapse-id';
  let wrapper;

  const createWrapper = propsData => {
    wrapper = shallowMount(Collapse, { propsData });
  };

  describe('default', () => {
    beforeEach(() => {
      createWrapper({
        id: collapseId,
      });
    });

    afterEach(() => {
      wrapper.destroy();
    });

    it('renders a BCollapse', () => {
      expect(wrapper.find(BCollapse).exists()).toBe(true);
    });
  });
});
