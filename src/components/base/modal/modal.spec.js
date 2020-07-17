import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BModal } from 'bootstrap-vue';
import { merge } from 'lodash';
import Modal from './modal.vue';
import Button from '../button/button.vue';
import { modalButtonDefaults } from '~/utils/constants';

const localVue = createLocalVue();
const BModalStub = localVue.extend(
  merge({}, BModal.options, {
    methods: {
      onClose: jest.fn(),
    },
    render(h) {
      return h('div', Object.values(this.$slots));
    },
  })
);

describe('Modal component', () => {
  let wrapperListeners;
  let wrapper;

  const findModal = () => wrapper.find(BModalStub);
  const findPrimaryButton = () => wrapper.find('.js-modal-action-primary');
  const findSecondaryButton = () => wrapper.find('.js-modal-action-secondary');
  const findCancelButton = () => wrapper.find('.js-modal-action-cancel');

  const createComponent = props => {
    wrapperListeners = {
      close: jest.fn(),
      secondary: jest.fn(),
    };

    wrapper = shallowMount(Modal, {
      localVue,
      propsData: {
        modalId: 'modal-id',
        ...props,
      },
      listeners: wrapperListeners,
      stubs: {
        'b-modal': BModalStub,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    jest.clearAllMocks();
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
      expect(findPrimaryButton().text()).toBe('Primary');
      expect(findSecondaryButton().text()).toBe('Secondary');
      expect(findCancelButton().text()).toBe('Cancel');
    });

    it('attributes array to be returned', () => {
      const attributes = wrapper.vm.buttonBinding(props.actionPrimary, 'actionPrimary');
      expect(attributes).toBe(props.actionPrimary.attributes);
    });

    it('default attributes to be returned', () => {
      const attributes = wrapper.vm.buttonBinding(props.actionSecondary, 'actionSecondary');
      expect(attributes).toBe(modalButtonDefaults.actionSecondary);
    });

    it('does not emit anything', () => {
      Object.keys(wrapperListeners).forEach(evt => {
        expect(wrapperListeners[evt]).not.toHaveBeenCalled();
      });
    });

    describe('when secondary is clicked', () => {
      beforeEach(() => {
        findSecondaryButton().vm.$emit('click');
      });

      it('should emit secondary', () => {
        expect(wrapperListeners.secondary).toHaveBeenCalledTimes(1);
      });

      it('should close modal', () => {
        expect(BModalStub.options.methods.onClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('accepts custom modal class', () => {
    createComponent({ modalClass: 'modal-class-override another-override' });
    expect(findModal().props('modalClass')).toContain('gl-modal');
    expect(findModal().props('modalClass')).toContain('modal-class-override another-override');
  });

  describe('when closed', () => {
    beforeEach(() => {
      createComponent();
      findModal().vm.$emit('close');
    });

    it('should emit closed', () => {
      expect(wrapperListeners.secondary).not.toHaveBeenCalled();
      expect(wrapperListeners.close).toHaveBeenCalledTimes(1);
    });
  });
});
