import { shallowMount } from '@vue/test-utils';
import Tooltip from '../../../components/charts/tooltip/tooltip.vue';

jest.mock('echarts', () => ({
  getInstanceByDom: jest.fn(instance => instance),
}));

describe('Chart Tooltip', () => {
  let wrapper;
  const chart = {
    getDom() {
      return this;
    },
    getAttribute() {
      return '_echarts_instance_';
    },
  };

  const target = () => wrapper.find(`#${wrapper.vm.containerId}`);

  afterEach(() => {
    wrapper.destroy();
  });

  it('prevent pointer events by default', () => {
    wrapper = shallowMount(Tooltip, {
      propsData: {
        chart,
      },
    });

    expect(target().classes()).toContain('gl-pointer-events-none');
    expect(wrapper).toMatchSnapshot();
  });

  describe('allow pointer events when selectableText is true', () => {
    wrapper = shallowMount(Tooltip, {
      propsData: {
        chart,
        selectableText: true,
      },
    });

    expect(target().classes()).not.toContain('gl-pointer-events-none');
    expect(wrapper).toMatchSnapshot();
  });
});
