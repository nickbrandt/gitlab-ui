import { shallowMount } from '@vue/test-utils';

import AreaChart from '../../../src/components/charts/area/area.vue';
import Chart from '../../../src/components/charts/chart/chart.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('area component', () => {
  let wrapper;
  let options;

  const findChart = () => wrapper.find(Chart);
  const findDataTooltip = () => wrapper.find({ ref: 'dataTooltip' });
  const findAnnotationsTooltip = () => wrapper.find({ ref: 'annotationsTooltip' });
  const getOptions = () => findChart().props('options');

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  beforeEach(() => {
    options = {
      series: [],
    };

    mockChartInstance = {
      getDom: () => {
        return {
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
      },
      on: jest.fn(),
      off: jest.fn(),
      convertToPixel: jest.fn(),
      getOption: () => {
        return options;
      },
    };

    wrapper = shallowMount(AreaChart, { propsData: { options, data: [] } });
    emitChartCreated();

    return wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits `created`, with the chart instance', () => {
    expect(wrapper.emitted('created').length).toBe(1);
    expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
  });

  describe('Annotations tooltips', () => {
    it('are hidden by default ', () => {
      return wrapper.vm.$nextTick(() => {
        expect(findAnnotationsTooltip().exists()).toBe(false);
      });
    });

    it('are displayed if passed via annotations props ', () => {
      wrapper.setProps({
        annotations: [
          {
            min: '',
            max: '',
          },
        ],
      });
      return wrapper.vm.$nextTick(() => {
        expect(findAnnotationsTooltip().exists()).toBe(true);
      });
    });

    it('are displayed if passed via option props ', () => {
      wrapper.setProps({
        option: {
          series: [
            {
              name: 'annotations',
              markPoint: {
                data: [
                  {
                    xAxis: 10,
                  },
                ],
              },
              data: [],
            },
          ],
        },
      });
      return wrapper.vm.$nextTick(() => {
        expect(findAnnotationsTooltip().exists()).toBe(true);
      });
    });

    it('has a default title and content when hovered', () => {
      const params = {
        name: 'annotations',
        componentType: 'markPoint',
        data: {
          xAxis: '2018-01-25T01:00:00.000Z',
          tooltipData: { content: 'Scranton strangler was caught.' },
        },
        event: {
          event: {
            zrX: 100,
            zrY: 100,
          },
        },
      };

      wrapper.setProps({
        annotations: [
          {
            min: '',
            max: '',
          },
        ],
      });

      wrapper.vm.onChartDataPointMouseOver(params);

      return wrapper.vm.$nextTick(() => {
        expect(findAnnotationsTooltip().html()).toContain(params.data.xAxis);
        expect(findAnnotationsTooltip().html()).toContain(params.data.tooltipData.content);
      });
    });
  });

  describe('tooltip position', () => {
    it('is initialized', () => {
      expect(findDataTooltip().props('left')).toBe('0');
      expect(findDataTooltip().props('top')).toBe('0');
    });

    it('is reset when the xAxis formatter is triggered', () => {
      const seriesId = 'Series Name0';
      const value = ['2020-02-10T06:45:26.879Z', 0.002671530922619002];
      const pixel = [66, 99];

      const params = {
        seriesData: [{ seriesId, value }],
      };

      mockChartInstance.convertToPixel.mockReturnValueOnce(pixel);

      getOptions().xAxis.axisPointer.label.formatter(params);

      return wrapper.vm.$nextTick(() => {
        expect(mockChartInstance.convertToPixel).toHaveBeenCalledWith({ seriesId }, value);

        expect(findDataTooltip().props('left')).toBe(`${pixel[0]}px`);
        expect(findDataTooltip().props('top')).toBe(`${pixel[1]}px`);
      });
    });
  });
});
