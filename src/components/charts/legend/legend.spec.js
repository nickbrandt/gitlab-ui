import { shallowMount } from '@vue/test-utils';
import { uniq } from 'lodash';
import Chart from '../chart/chart.vue';
import Legend from './legend.vue';
import GlTooltip from '~/components/base/tooltip/tooltip.vue';
import GlChartSeriesLabel from '../series_label/series_label.vue';

jest.mock('echarts', () => ({
  getInstanceByDom: jest.fn(instance => instance),
  init: jest.fn(() => ({
    dispatchAction: jest.fn(),
    resize: jest.fn(),
    setOption: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  })),
  registerTheme: jest.fn(),
}));

const seriesInfo = [
  {
    type: 'solid',
    name: 'Example Title 1',
    color: 'red',
    data: [1, 2, 3, 4, 5],
  },
  {
    type: 'solid',
    name: 'Example Title 2',
    color: 'red',
    data: [1, 2, 3, 4, 5],
  },
  {
    type: 'solid',
    name: 'Example Title 3',
    color: 'red',
    data: [1, 2, 3, 4, 5],
  },
];

describe('chart legend component', () => {
  let chartWrapper;
  let legendWrapper;
  let chart;

  const chartArgs = [
    Chart,
    {
      propsData: { options: {} },
      listeners: {
        created: chartInstance => {
          chart = chartInstance;
          chart.getDom = () => chartInstance;
        },
      },
    },
  ];

  const buildLegend = (propsData = {}) => {
    legendWrapper = shallowMount(Legend, {
      propsData: {
        ...propsData,
        chart,
        seriesInfo,
      },
    });
  };

  beforeEach(() => {
    chartWrapper = shallowMount(...chartArgs);
    // Runs after mounting the chart so that it has an up to date reference
    buildLegend();
  });

  afterEach(() => {
    chartWrapper.destroy();
    legendWrapper.destroy();
  });

  it('renders the legend with no errors', () => {
    expect(legendWrapper.exists()).toBe(true);
  });

  it('displays correct number of series labels', () => {
    expect(legendWrapper.findAll(GlChartSeriesLabel).length).toBe(3);
  });

  it('allows user to override max value label text using props', () => {
    buildLegend({ maxText: 'maxText' });

    expect(legendWrapper.text()).toMatch('maxText');
  });

  it('allows user to override average value label text using props', () => {
    buildLegend({ averageText: 'averageText' });

    expect(legendWrapper.text()).toMatch('averageText');
  });

  it('displays "Avg" for the average value label by default', () => {
    expect(legendWrapper.props().averageText).toMatch('Avg');
  });

  it('displays "Max" for the max value label by default', () => {
    expect(legendWrapper.props().maxText).toMatch('Max');
  });

  it('displays "Min" for the min value label by default', () => {
    expect(legendWrapper.props().minText).toMatch('Min');
  });

  it('displays "Current" for the current value label by default', () => {
    expect(legendWrapper.props().currentText).toMatch('Current');
  });

  describe('when clicking on a series label', () => {
    it('dispatches a `highlight` action on the chart', () => {
      legendWrapper.find(GlChartSeriesLabel).trigger('click');
      expect(chart.dispatchAction).toHaveBeenCalled();
    });
  });

  it('renders the inline layout by default', () => {
    expect(legendWrapper.props().layout).toMatch('inline');
    expect(legendWrapper.contains('.gl-legend-inline')).toBe(true);
    expect(legendWrapper.contains('.gl-legend-tabular')).toBe(false);
  });

  describe('when setting the layout prop to table', () => {
    beforeEach(() => {
      buildLegend({ layout: 'table' });
      legendWrapper.vm.$nextTick();
    });

    it('renders the table layout', () => {
      expect(legendWrapper.contains('.gl-legend-tabular')).toBe(true);
    });

    it('does not render the inline layout', () => {
      expect(legendWrapper.contains('.gl-legend-inline')).toBe(false);
    });

    it('allows user to override min value label text using props', () => {
      legendWrapper.setProps({ minText: 'minText' });

      return legendWrapper.vm.$nextTick().then(() => {
        expect(legendWrapper.text()).toMatch('minText');
      });
    });

    it('allows user to override current value label text using props', () => {
      legendWrapper.setProps({ currentText: 'currentText' });

      return legendWrapper.vm.$nextTick().then(() => {
        expect(legendWrapper.text()).toMatch('currentText');
      });
    });

    it('displays en-dash where series data is not present', () => {
      const series = [
        {
          type: 'solid',
          name: 'Example Title',
          color: 'red',
          data: [],
        },
      ];

      legendWrapper.setProps({
        seriesInfo: series,
      });

      return legendWrapper.vm.$nextTick().then(() => {
        legendWrapper.findAll('.gl-legend-tabular-details-cell').wrappers.forEach(wrapper => {
          expect(wrapper.text()).toBe('-');
        });
      });
    });

    describe('tooltip', () => {
      const findLegendTableRows = () => legendWrapper.findAll('.gl-legend-tabular-row').wrappers;
      let tooltips;
      let seriesLabels;

      beforeEach(() => {
        tooltips = findLegendTableRows().map(row => row.find(GlTooltip));
        seriesLabels = findLegendTableRows().map(row => row.find('.gl-legend-tabular-title-cell'));
      });

      it('renders the tooltips for each row', () => {
        tooltips.forEach(tooltip => {
          expect(tooltip.exists()).toBe(true);
        });
      });

      it('renders the series labels for each row', () => {
        seriesLabels.forEach(seriesLabel => {
          expect(seriesLabel.exists()).toBe(true);
        });
      });

      it('targets its sibling label', () => {
        tooltips.forEach((tooltip, index) => {
          expect(tooltip.attributes('target')).toBe(seriesLabels[index].attributes('id'));
        });
      });

      it('has a unique target', () => {
        const tooltipTargets = tooltips.map(tooltip => {
          return tooltip.attributes('target');
        });
        expect(uniq(tooltipTargets).length).toBe(tooltipTargets.length);
      });
    });
  });
});
