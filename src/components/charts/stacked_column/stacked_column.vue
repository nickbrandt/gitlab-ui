<script>
import merge from 'lodash/merge';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import defaultChartOptions, {
  grid,
  yAxis,
  dataZoomAdjustments,
  mergeSeriesToOptions,
  generateBarSeries,
  generateLineSeries,
} from '../../../utils/charts/config';
import { hexToRgba, debounceByAnimationFrame, deprecationWarning } from '../../../utils/utils';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import {
  LEGEND_LAYOUT_INLINE,
  LEGEND_LAYOUT_TABLE,
  LEGEND_AVERAGE_TEXT,
  LEGEND_CURRENT_TEXT,
  LEGEND_MIN_TEXT,
  LEGEND_MAX_TEXT,
  CHART_TYPE_LINE,
} from '../../../utils/charts/constants';
import { columnOptions } from '../../../utils/constants';

const yAxisDefaults = {
  ...yAxis,
  nameLocation: 'center',
  axisTick: {
    show: false,
  },
};

export default {
  components: {
    Chart,
    ChartTooltip,
    ChartLegend,
    TooltipDefaultFormat,
  },
  mixins: [ToolboxMixin],
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
    bars: {
      type: Array,
      required: false,
      default: () => [],
    },
    lines: {
      type: Array,
      required: false,
      default: () => [],
    },
    secondaryData: {
      type: Array,
      required: false,
      default: () => [],
    },
    option: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    presentation: {
      type: String,
      required: false,
      default: 'stacked',
      validator: value => ['stacked', 'tiled'].indexOf(value) !== -1,
    },
    groupBy: {
      type: Array,
      required: true,
    },
    xAxisType: {
      type: String,
      required: true,
      validator: value => ['value', 'category', 'time', 'log'].indexOf(value) !== -1,
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
    secondaryDataTitle: {
      type: String,
      required: false,
      default: '',
    },
    seriesNames: {
      type: Array,
      required: false,
      default: () => [],
    },
    legendAverageText: {
      type: String,
      required: false,
      default: LEGEND_AVERAGE_TEXT,
    },
    legendMaxText: {
      type: String,
      required: false,
      default: LEGEND_MAX_TEXT,
    },
    legendMinText: {
      type: String,
      required: false,
      default: LEGEND_MIN_TEXT,
    },
    legendCurrentText: {
      type: String,
      required: false,
      default: LEGEND_CURRENT_TEXT,
    },
    legendLayout: {
      type: String,
      required: false,
      default: LEGEND_LAYOUT_INLINE,
      validator(layout) {
        return [LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE].indexOf(layout) !== -1;
      },
    },
  },
  data() {
    return {
      chart: null,
      showTooltip: false,
      tooltipTitle: '',
      tooltipContent: {},
      tooltipPosition: {
        left: '0',
        top: '0',
      },
      debouncedMoveShowTooltip: debounceByAnimationFrame(this.moveShowTooltip),
    };
  },
  computed: {
    hasSecondaryAxis() {
      return Boolean(this.secondaryData.length);
    },
    barSeries() {
      return this.bars.map(({ name, data }, index) => {
        const stack = this.presentation === 'stacked' ? this.groupBy : null;
        const color = colorFromDefaultPalette(index);
        return generateBarSeries({ stack, name, data, color });
      });
    },
    lineSeries() {
      const offset = this.bars.length;
      return this.lines.map(({ name, data }, index) => {
        const color = colorFromDefaultPalette(offset + index);
        return generateLineSeries({ name, data, color });
      });
    },
    dataSeries() {
      return this.data.map((series, index) => {
        const barColor = colorFromDefaultPalette(index);
        return {
          type: 'bar',
          stack: this.presentation === 'stacked' ? this.groupBy : null,
          name: this.seriesNames[index],
          data: series,
          itemStyle: {
            color: hexToRgba(barColor, 0.2),
            barBorderColor: barColor,
            barBorderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              color: hexToRgba(barColor, 0.4),
            },
          },
        };
      });
    },
    secondarySeries() {
      const offset = this.bars.length + this.lines.length;
      return this.secondaryData.map(({ name, data, type, stack = columnOptions.tiled }, index) => {
        const color = colorFromDefaultPalette(offset + index);
        return type === CHART_TYPE_LINE
          ? generateLineSeries({ color, name, data, yAxisIndex: 1 })
          : generateBarSeries({ color, name, data, yAxisIndex: 1, stack });
      });
    },
    series() {
      return [...this.dataSeries, ...this.barSeries, ...this.lineSeries, ...this.secondarySeries];
    },
    options() {
      const mergedOptions = merge(
        {},
        defaultChartOptions,
        {
          grid: {
            ...grid,
            right: this.hasSecondaryAxis ? 64 : 32,
          },
          xAxis: {
            boundaryGap: true,
            axisLabel: {
              margin: 20,
              verticalAlign: 'bottom',
            },
            axisLine: {
              show: false,
            },
            axisPointer: {
              show: true,
              type: 'none',
              label: {
                formatter: this.onLabelChange,
              },
            },
            data: this.groupBy,
            name: this.xAxisTitle,
            type: this.xAxisType,
          },
          yAxis: [
            {
              ...yAxisDefaults,
              name: this.yAxisTitle,
            },
            {
              ...yAxisDefaults,
              name: this.secondaryDataTitle,
              show: this.hasSecondaryAxis,
            },
          ],
          legend: {
            show: false,
          },
        },
        this.option,
        dataZoomAdjustments(this.option.dataZoom),
        this.toolboxAdjustments
      );
      // All chart options can be merged but series
      // needs to be handled specially
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
    legendStyle() {
      return { paddingLeft: `${grid.left}px` };
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    seriesInfo() {
      return this.compiledOptions.series.reduce((acc, series, index) => {
        acc.push({
          name: series.name,
          type: series.type,
          color: colorFromDefaultPalette(index),
          data: series.data.map(data => data),
          yAxisIndex: series.yAxisIndex,
        });
        return acc;
      }, []);
    },
  },
  beforeDestroy() {
    this.chart.getDom().removeEventListener('mousemove', this.debouncedMoveShowTooltip);
    this.chart.getDom().removeEventListener('mouseout', this.debouncedMoveShowTooltip);
  },
  methods: {
    moveShowTooltip(mouseEvent) {
      this.tooltipPosition = {
        left: `${mouseEvent.zrX}px`,
        top: `${mouseEvent.zrY}px`,
      };
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    onCreated(chart) {
      if (this.data.length) {
        /* eslint-disable-next-line no-console */
        deprecationWarning(
          'The `data` prop is deprecated for the Column Chart. Please use the `bars` prop instead. See https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/1703#note_417946072 for more information.'
        );
      }
      chart.getDom().addEventListener('mousemove', this.debouncedMoveShowTooltip);
      chart.getDom().addEventListener('mouseout', this.debouncedMoveShowTooltip);
      this.chart = chart;
      this.$emit('created', chart);
    },
    onLabelChange(params) {
      const { tooltipContent } = params.seriesData.reverse().reduce(
        (acc, bar) => {
          const barColor = colorFromDefaultPalette(bar.seriesIndex);

          acc.tooltipContent[bar.seriesName] = {
            value: bar.value,
            index: bar.seriesIndex,
            color: barColor,
          };

          return acc;
        },
        {
          tooltipContent: {},
        }
      );

      this.tooltipTitle = params.value;
      this.$set(this, 'tooltipContent', tooltipContent);
    },
  },
};
</script>
<template>
  <div class="position-relative">
    <chart v-bind="$attrs" :options="options" v-on="$listeners" @created="onCreated" />
    <chart-tooltip
      v-if="chart"
      :show="showTooltip"
      :chart="chart"
      :top="tooltipPosition.top"
      :left="tooltipPosition.left"
    >
      <div slot="title">{{ tooltipTitle }} ({{ xAxisTitle }})</div>
      <tooltip-default-format :tooltip-content="tooltipContent" />
    </chart-tooltip>
    <chart-legend
      v-if="compiledOptions"
      :chart="chart"
      :style="legendStyle"
      :series-info="seriesInfo"
      :text-style="compiledOptions.textStyle"
      :min-text="legendMinText"
      :max-text="legendMaxText"
      :average-text="legendAverageText"
      :current-text="legendCurrentText"
      :layout="legendLayout"
    />
  </div>
</template>
