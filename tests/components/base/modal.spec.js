import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BModal } from 'bootstrap-vue';
import Modal from '../../../src/components/base/modal/modal.vue';
import Button from '../../../src/components/base/button/button.vue';
import { modalButtonDefaults } from '../../../src/utils/constants';

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

    it('renders BModal', () => {
      expect(findModal().exists()).toBe(true);
    });

    it('applies default modal class', () => {
      expect(findModal().props('modalClass')).toContain('gl-modal');
    });
  });

  describe('modal footer', () => {
    const props = {
      actionPrimary: {
        text: 'Primary',
        attributes: [{ variant: 'info' }],
      },
      actionSecondary: {
        text: 'Secondary',
      },
      actionCancel: {
        text: 'Cancel',
        attributes: [{ variant: 'danger' }],
      },
    };

    beforeEach(() => {
      createComponent(props);
    });

    it('should render three buttons', () => {
      expect(wrapper.findAll(Button)).toHaveLength(3);
    });

    it('buttons should render prop text', () => {
      const primaryButton = wrapper.find('.js-modal-action-primary');
      const secondaryButton = wrapper.find('.js-modal-action-secondary');
      const cancelButton = wrapper.find('.js-modal-action-cancel');
      expect(primaryButton.text()).toBe('Primary');
      expect(secondaryButton.text()).toBe('Secondary');
      expect(cancelButton.text()).toBe('Cancel');
    });

    it('attributes array to be returned', () => {
      const attributes = wrapper.vm.buttonBinding(props.actionPrimary, 'actionPrimary');
      expect(attributes).toBe(props.actionPrimary.attributes);
    });

    it('default attributes to be returned', () => {
      const attributes = wrapper.vm.buttonBinding(props.actionSecondary, 'actionSecondary');
      expect(attributes).toBe(modalButtonDefaults.actionSecondary);
    });
  });

  it('accepts custom modal class', () => {
    createComponent({ modalClass: 'modal-class-override another-override' });
    expect(findModal().props('modalClass')).toContain('gl-modal');
    expect(findModal().props('modalClass')).toContain('modal-class-override another-override');
  });

  describe('isFocusable', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    it('should return false if `elt` argument is falsy', () => {
      const myBtn = document.querySelector('button');

      expect(wrapper.vm.isFocusable(myBtn)).toBe(false);
    });

    it('should return true for a button', () => {
      document.body.innerHTML = '<button> My Button </button>';
      const myBtn = document.querySelector('button');

      expect(wrapper.vm.isFocusable(myBtn)).toBe(true);
    });

    it('should return false for an element with a z-index of -1', () => {
      document.body.innerHTML = '<button z-index="-1"> My Button </button>';
      const myBtn = document.querySelector('button');

      expect(wrapper.vm.isFocusable(myBtn)).toBe(false);
    });

    it('should return true for an input', () => {
      document.body.innerHTML = '<input type="text" />';
      const myInput = document.querySelector('input');

      expect(wrapper.vm.isFocusable(myInput)).toBe(true);
    });

    it('should return false for an input with a type hidden', () => {
      document.body.innerHTML = '<input type="hidden" />';
      const myInput = document.querySelector('input');

      expect(wrapper.vm.isFocusable(myInput)).toBe(false);
    });

    it('should return false for a disabled button', () => {
      document.body.innerHTML = '<button disabled> My Button </button>';
      const myBtn = document.querySelector('button');

      expect(wrapper.vm.isFocusable(myBtn)).toBe(true);
    });

    it('should return true for an anchor tag with an href attribute', () => {
      document.body.innerHTML = '<a href="mylink"> My Link </a>';
      const myAnchor = document.querySelector('a');

      expect(wrapper.vm.isFocusable(myAnchor)).toBe(true);
    });

    it('should return true for an anchor tag without an href attribute', () => {
      document.body.innerHTML = '<a href=""> My Link </a>';
      const myAnchor = document.querySelector('a');

      expect(wrapper.vm.isFocusable(myAnchor)).toBe(false);
    });
  });
});
