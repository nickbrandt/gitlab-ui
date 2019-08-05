import { shallowMount, createLocalVue } from '@vue/test-utils';
import Token from '../../../components/base/token/token.vue';

const localVue = createLocalVue();

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
    wrapper.find('i').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
