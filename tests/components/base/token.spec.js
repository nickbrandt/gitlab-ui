import { shallowMount, createLocalVue } from '@vue/test-utils';
import Token from '../../../src/components/base/token/token.vue';
import GlIcon from '../../../src/components/base/icon/icon.vue';

const localVue = createLocalVue();

const findIcon = wrapper => wrapper.find(GlIcon);

describe('Token component', () => {
  let wrapper;

  const createComponent = propsData =>
    shallowMount(Token, {
      localVue,
      propsData,
    });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits close when "x" is clicked', () => {
    wrapper = createComponent();
    findIcon(wrapper).vm.$emit('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('hides the icon when view-only', () => {
    wrapper = createComponent({ viewOnly: true });
    expect(findIcon(wrapper).exists()).toBe(false);
  });
});
