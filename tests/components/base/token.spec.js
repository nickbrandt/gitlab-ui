import { shallowMount, createLocalVue } from '@vue/test-utils';
import Token from '../../../components/base/token/token.vue';

const localVue = createLocalVue();

const findIcon = wrapper => wrapper.find('i');

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
    findIcon(wrapper).trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('hides the icon when view-only', () => {
    wrapper = createComponent({ viewOnly: true });
    expect(findIcon(wrapper).exists()).toBe(false);
  });
});
