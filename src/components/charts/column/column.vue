<script>
import merge from 'lodash/merge';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import defaultChartOptions, {
  grid,
  yAxis,
  dataZoomAdjustments,
  mergeSeriesToOptions,
  getDefaultTooltipContent,
  generateBarSeries,
  generateLineSeries,
} from '../../../utils/charts/config';
import { hexToRgba, debounceByAnimationFrame, deprecationWarning } from '../../../utils/utils';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import { TOOLTIP_LEFT_OFFSET, CHART_TYPE_LINE } from '../../../utils/charts/constants';
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
    TooltipDefaultFormat,
  },
  mixins: [ToolboxMixin],
  inheritAttrs: false,
  props: {
    data: {
      type: Object,
      required: false,
      default: () => ({}),
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
    yAxisTitle: {
      type: String,
      required: true,
    },
    secondaryDataTitle: {
      type: String,
      required: false,
      default: '',
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    xAxisType: {
      type: String,
      required: true,
      validator: value => ['value', 'category', 'time', 'log'].indexOf(value) !== -1,
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
    dataSeries() {
      return Object.keys(this.data).map((key, index) => {
        const barColor = colorFromDefaultPalette(index);
        return {
          name: key,
          data: this.data[key],
          type: 'bar',
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
          large: true,
          largeThreshold: 300,
          barMaxWidth: '50%',
        };
      });
    },
    barSeries() {
      return this.bars.map(({ name, data }, index) => {
        const color = colorFromDefaultPalette(index);
        return generateBarSeries({ stack: this.groupBy, name, data, color });
      });
    },
    lineSeries() {
      const offset = this.bars.length;
      return this.lines.map(({ name, data }, index) => {
        const color = colorFromDefaultPalette(offset + index);
        return generateLineSeries({ name, data, color });
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
  },
  beforeDestroy() {
    this.chart.getDom().removeEventListener('mousemove', this.debouncedMoveShowTooltip);
    this.chart.getDom().removeEventListener('mouseout', this.debouncedMoveShowTooltip);
  },
  methods: {
    moveShowTooltip(mouseEvent) {
      this.tooltipPosition = {
        left: `${mouseEvent.zrX + TOOLTIP_LEFT_OFFSET}px`,
        top: `${mouseEvent.zrY}px`,
      };
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    onCreated(chart) {
      if (Object.keys(this.data).length) {
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
      const { xLabels, tooltipContent } = getDefaultTooltipContent(params, this.yAxisTitle);

      this.$set(this, 'tooltipContent', tooltipContent);
      this.tooltipTitle = xLabels.join(', ');
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
  </div>
</template>
