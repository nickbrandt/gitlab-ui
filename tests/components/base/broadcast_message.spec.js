import { shallowMount } from '@vue/test-utils';
import GlBroadcastMessage from '../../../src/components/base/broadcast_message/broadcast_message.vue';

describe('Broadcast message component', () => {
  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(GlBroadcastMessage, options);
  };

  const findDismissButton = () => wrapper.find({ ref: 'dismiss' });

  beforeEach(() => {
    createComponent({ slots: { default: 'some message' } });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('clicking on dismiss button emits a dismiss event', () => {
    findDismissButton().trigger('click');

    expect(wrapper.emitted('dismiss')).toHaveLength(1);
  });
});
