import { shallowMount } from '@vue/test-utils';
import ClearIconButton from '../../../src/components/shared_components/clear_icon_button/clear_icon_button.vue';

describe('Clear Icon Button', () => {
  let wrapper;

  const defaultPropsData = {
    title: 'Tooltip Text',
    tooltipContainer: '#divId',
  };

  const createComponent = (propsData = defaultPropsData) => {
    wrapper = shallowMount(ClearIconButton, { propsData });
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
