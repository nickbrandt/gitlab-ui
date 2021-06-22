import { createLocalVue, mount } from '@vue/test-utils';
import GlToast from './toast';

const localVue = createLocalVue();
localVue.use(GlToast);
const Component = {
  template: `<div />`,
};

describe('GlToast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
    });
  });

  it('attaches $toast propery', () => {
    expect(wrapper.vm.$toast).toEqual({
      show: expect.any(Function),
    });
  });

  it('show returns a toast object', () => {
    const toast = wrapper.vm.$toast.show('foo');
    expect(toast).toEqual({
      id: expect.any(String),
      hide: expect.any(Function),
    });
  });
});
