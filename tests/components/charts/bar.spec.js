import { shallowMount } from '@vue/test-utils';
import BarChart from '../../../src/components/charts/bar/bar.vue';
import Chart from '../../../src/components/charts/chart/chart.vue';
import ChartTooltip from '../../../src/components/charts/tooltip/tooltip.vue';
import TooltipDefaultFormat from '../../../src/components/shared_components/charts/tooltip_default_format.vue';

const mockChartInstance = {
  getDom: () => {
    return {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  },
};

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

const defaultChartProps = {
  xAxisTitle: 'Pushes per day',
  xAxisType: 'value',
  yAxisTitle: 'User',
  data: {
    Office: [
      [100, 'Jim'],
      [300, 'Pam'],
    ],
  },
};

describe('Bar chart component', () => {
  let wrapper;

  const findChart = () => wrapper.find(Chart);
  const findChartTooltip = () => wrapper.find(ChartTooltip);
  const getOptions = () => findChart().props('options');
  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  beforeEach(() => {
    wrapper = shallowMount(BarChart, {
      propsData: defaultChartProps,
      stubs: {
        'tooltip-default-format': TooltipDefaultFormat,
      },
    });
    emitChartCreated();

    return wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits "created" when onCreated is called', () => {
    wrapper.vm.onCreated(wrapper.vm.chart);

    expect(wrapper.emitted('created')).toBeTruthy();
  });

  describe('Tooltip', () => {
    const labelParams = {
      value: 'Jim',
      seriesName: 'Office',
      seriesData: [
        {
          seriesId: 'Office',
          data: [100, 'Jim'],
          value: [100, 'Jim'],
        },
      ],
    };

    it('calls custom method and returns title with y labels', () => {
      const getDefaultTooltipContentReturnVal = { yLabels: [], tooltipContent: {} };

      // stub the method
      wrapper.vm.getDefaultTooltipContent = jest
        .fn()
        .mockReturnValue(getDefaultTooltipContentReturnVal);

      // label formatter is triggered here which should eventually call
      // getDefaultTooltipContent
      getOptions().yAxis.axisPointer.label.formatter(labelParams);

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.getDefaultTooltipContent).toHaveBeenCalled();
      });
    });

    it('sets accurate tooltip title and content state', () => {
      getOptions().yAxis.axisPointer.label.formatter(labelParams);

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.tooltipTitle).toBe(labelParams.value);
        expect(wrapper.vm.tooltipContent[defaultChartProps.xAxisTitle].value).toBe(
          labelParams.seriesData[0].data[0]
        );
      });
    });

    it('render accurate tooltip title and content', () => {
      const expectedTooltipTitle = `${labelParams.value} (${defaultChartProps.yAxisTitle})`;

      getOptions().yAxis.axisPointer.label.formatter(labelParams);
      return wrapper.vm.$nextTick(() => {
        const tooltipTextContent = findChartTooltip().element.textContent;

        expect(tooltipTextContent).toContain(expectedTooltipTitle);
        expect(tooltipTextContent).toContain(defaultChartProps.xAxisTitle);
        expect(tooltipTextContent).toContain(labelParams.seriesData[0].data[0]);
      });
    });
  });
});
