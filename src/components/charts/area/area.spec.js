import { shallowMount } from '@vue/test-utils';

import AreaChart from './area.vue';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';

import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('area component', () => {
  let wrapper;
  let options;

  const findChart = () => wrapper.find(Chart);
  const findLegend = () => wrapper.find(ChartLegend);
  const findDataTooltip = () => wrapper.find({ ref: 'dataTooltip' });
  const findAnnotationsTooltip = () => wrapper.find({ ref: 'annotationsTooltip' });

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createShallowWrapper = (props = {}) => {
    wrapper = shallowMount(AreaChart, { propsData: { options, data: [], ...props } });
    emitChartCreated();
  };

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
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits `created`, with the chart instance', () => {
    createShallowWrapper();

    return wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('created').length).toBe(1);
      expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
    });
  });

  describe('Annotations tooltips', () => {
    it('are hidden by default ', () => {
      createShallowWrapper();

      return wrapper.vm.$nextTick(() => {
        expect(findAnnotationsTooltip().exists()).toBe(false);
      });
    });

    it('are displayed if passed via annotations props ', () => {
      createShallowWrapper({
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
      createShallowWrapper({
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

      createShallowWrapper({
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
    beforeEach(() => {
      createShallowWrapper();
    });

    it('is initialized', () => {
      expect(findDataTooltip().props('left')).toBe('0');
      expect(findDataTooltip().props('top')).toBe('0');
    });

    it('is reset when mouse moves', () => {
      const left = '10px';
      const top = '30px';

      wrapper.setData({ dataTooltipPosition: { left, top } });

      return wrapper.vm.$nextTick(() => {
        expect(findDataTooltip().props('left')).toBe(`${left}`);
        expect(findDataTooltip().props('top')).toBe(`${top}`);
      });
    });
  });

  describe('legend', () => {
    it('is inline by default', () => {
      createShallowWrapper();

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
      });
    });

    it('is inline if correct prop value is set', () => {
      createShallowWrapper({
        legendLayout: LEGEND_LAYOUT_INLINE,
      });

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
      });
    });

    it('is tabular if correct prop value is set', () => {
      createShallowWrapper({
        legendLayout: LEGEND_LAYOUT_TABLE,
      });

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_TABLE);
      });
    });
  });
});
