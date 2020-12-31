import { shallowMount } from '@vue/test-utils';
import CloseButton from './close_button.vue';

describe('Clear Icon Button', () => {
  let wrapper;

  const defaultPropsData = {
    label: 'Dismiss',
  };

  const createComponent = (propsData = defaultPropsData) => {
    wrapper = shallowMount(CloseButton, { propsData });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders successfully', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
