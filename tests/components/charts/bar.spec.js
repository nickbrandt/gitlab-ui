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
  setOption: jest.fn(),
  convertToPixel: jest.fn(),
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

const dataWithNegativeValues = {
  Office: [
    [-100, 'Scranton Strangler'],
    [200, 'Dwight Kurt Schrute'],
  ],
};

describe('Bar chart component', () => {
  let wrapper;

  const findChart = () => wrapper.find(Chart);
  const findChartTooltip = () => wrapper.find(ChartTooltip);
  const getOptions = () => findChart().props('options');
  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createComponent = () => {
    wrapper = shallowMount(BarChart, {
      propsData: defaultChartProps,
      stubs: {
        'tooltip-default-format': TooltipDefaultFormat,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  describe('when mounted', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should render chart with axis and series', () => {
      const chart = findChart();

      expect(chart.props('options')).toMatchSnapshot();
    });

    it('should not emit created', () => {
      expect(wrapper.emitted('created')).toBeUndefined();
    });
  });

  describe('when mounted and chart has created', () => {
    beforeEach(() => {
      createComponent();
      emitChartCreated();
    });

    it('emits "created" when onCreated is called', () => {
      expect(wrapper.emitted('created')).toEqual([[mockChartInstance]]);
    });

    describe('Y axis name', () => {
      it('label are not ellipsized for positive values', () => {
        const pixel = 180;
        const expectedNameGap = 162;

        mockChartInstance.convertToPixel.mockReturnValueOnce(pixel);

        findChart().vm.$emit('updated');

        return wrapper.vm.$nextTick(() => {
          expect(mockChartInstance.convertToPixel).toHaveBeenCalled();
          expect(mockChartInstance.setOption).toHaveBeenCalledWith(
            expect.objectContaining({
              yAxis: {
                nameGap: expectedNameGap,
              },
            })
          );
        });
      });

      it('label are not ellipsized for negative values', () => {
        const pixel = 180;
        const expectedNameGap = 60;

        wrapper.setProps({
          data: dataWithNegativeValues,
        });

        mockChartInstance.convertToPixel.mockReturnValueOnce(pixel);

        findChart().vm.$emit('updated');

        return wrapper.vm.$nextTick(() => {
          expect(mockChartInstance.convertToPixel).toHaveBeenCalled();
          expect(mockChartInstance.setOption).toHaveBeenCalledWith(
            expect.objectContaining({
              yAxis: {
                nameGap: expectedNameGap,
                axisLabel: {
                  formatter: expect.any(Function),
                },
              },
            })
          );
        });
      });
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
});
