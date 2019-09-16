import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BModal } from 'bootstrap-vue';
import Modal from '../../../components/base/modal/modal.vue';

const localVue = createLocalVue();

describe('Modal component', () => {
  let wrapper;

  const findModal = () => wrapper.find(BModal);

  const createComponent = props => {
    wrapper = shallowMount(Modal, {
      localVue,
      propsData: {
        modalId: 'modal-id',
        ...props,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  describe('default', () => {
    beforeEach(() => {
      createComponent();
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it('renders BModal', () => {
      expect(findModal().exists()).toBe(true);
    });

    it('applies default modal class', () => {
      expect(findModal().props('modalClass')).toContain('gl-modal');
    });
  });

  it('accepts custom modal class', () => {
    createComponent({ modalClass: 'modal-class-override another-override' });
    expect(findModal().props('modalClass')).toContain('gl-modal');
    expect(findModal().props('modalClass')).toContain('modal-class-override another-override');
  });
});
