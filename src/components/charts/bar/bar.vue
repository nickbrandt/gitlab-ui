<script>
import merge from 'lodash/merge';
import minBy from 'lodash/minBy';
import min from 'lodash/min';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import { grid, dataZoomAdjustments, mergeSeriesToOptions } from '../../../utils/charts/config';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import { engineeringNotation } from '../../../utils/number_utils';
import { colorFromPalette } from '../../../utils/charts/theme';
import { hexToRgba, debounceByAnimationFrame, ellipsize } from '../../../utils/utils';

const DEFAULT_NAME_GAP = 60;
const NAME_GAP_OFFSET = 18;

/**
 * Because the axes are reversed in bar charts defaultChartOptions
 * xAxis and yAxis needs to be handled specifically.
 */
const defaultOptions = {
  grid: {
    ...grid,
    left: 22,
    containLabel: true,
  },
  xAxis: {
    nameLocation: 'center',
    axisLabel: {
      formatter: num => engineeringNotation(num, 2),
    },
  },
  yAxis: {
    boundaryGap: true,
    nameLocation: 'center',
    splitLine: {
      show: false,
    },
    axisLabel: {
      interval: 0,
    },
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
      required: true,
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
    xAxisTitle: {
      type: String,
      required: true,
    },
    xAxisType: {
      type: String,
      required: false,
      default: 'value',
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
    series() {
      return Object.keys(this.data).map((key, index) => {
        const barColor = colorFromPalette(index);

        return {
          name: key,
          data: this.data[key],
          type: 'bar',
          stack: 'chart',
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
          barMaxWidth: '50%',
        };
      });
    },
    options() {
      const mergedOptions = merge(
        {},
        defaultOptions,
        {
          xAxis: {
            axisLine: {
              show: false,
            },
            name: this.xAxisTitle,
            type: this.xAxisType,
          },
          yAxis: {
            name: this.yAxisTitle,
            nameGap: DEFAULT_NAME_GAP,
            type: 'category',
            axisTick: {
              show: true,
            },
            axisPointer: {
              show: true,
              type: 'none',
              label: {
                formatter: this.onLabelChange,
              },
            },
          },
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
    if (this.chart) {
      this.chart.getDom().removeEventListener('mousemove', this.debouncedMoveShowTooltip);
      this.chart.getDom().removeEventListener('mouseout', this.debouncedMoveShowTooltip);
    }
  },
  methods: {
    moveShowTooltip(mouseEvent) {
      const xOffset = 2;
      this.tooltipPosition = {
        left: `${mouseEvent.zrX + xOffset}px`,
        top: `${mouseEvent.zrY}px`,
      };
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
      chart.getDom().addEventListener('mousemove', this.debouncedMoveShowTooltip);
      chart.getDom().addEventListener('mouseout', this.debouncedMoveShowTooltip);
    },
    onLabelChange(params) {
      const { yLabels, tooltipContent } = this.getDefaultTooltipContent(params, this.xAxisTitle);

      this.$set(this, 'tooltipContent', tooltipContent);
      this.tooltipTitle = yLabels.join(', ');
    },
    onUpdated(chart) {
      this.$emit('updated', chart);
      this.updateYAxisNameGap();
    },
    /**
     * Bar charts axis names can overlap with long axis labels.
     * eCharts currently does not have a way to dynamically position
     * them based on axis labels length.
     * There is an existing github pull request here to solve the issue
     * https://github.com/apache/incubator-echarts/pull/12236
     *
     * This is a temporary fix until the above PR goes in.
     * More about the rationale here
     * https://gitlab.com/gitlab-org/gitlab/-/merge_requests/27155#note_307126569
     *
     * This method gets the pixel value of [0,*] in the coordinate system.
     * Based on the pixel value the axis name is positioned using nameGap option.
     * It works only if the chart has non-negative values.
     *
     * If the chart has negative values, the coord system x-axis doesn't start with 0
     * and hence finding the pixel value isn't possible. In such cases, the axis
     * labels are ellipsized and nameGap is set to default 50 px.
     *
     */
    updateYAxisNameGap() {
      if (this.chart) {
        const [value] = this.getDataExtent();
        const hasNegativeValue = Math.sign(value) < 0;
        const nameGap = hasNegativeValue
          ? DEFAULT_NAME_GAP
          : this.chart.convertToPixel({ xAxisIndex: 0 }, 0) - NAME_GAP_OFFSET;
        const newOptions = {
          yAxis: {
            nameGap,
            ...(hasNegativeValue && {
              axisLabel: {
                formatter: str => ellipsize(str),
              },
            }),
          },
        };

        this.chart.setOption(newOptions);
      }
    },
    /**
     * Get the data extent among all series to get the lowest value.
     * This is to find out if data has negative values.
     *
     * The importance of negative values are in updateYAxisNameGap's docstring
     *
     * @returns {Array} data point
     */
    getDataExtent() {
      return min(Object.values(this.data).map(series => minBy(series, ([val]) => val)));
    },
    /**
     * The existing getDefaultTooltipContent in utils works against the y-axis value.
     * However, for bar charts, the tooltip should be against x-axis values.
     * This method will be removed after https://gitlab.com/gitlab-org/gitlab-ui/-/issues/674
     *
     * @param {Object} params series data
     * @param {String} xAxisTitle x-axis title
     * @returns {Object} tooltip title and content
     */
    getDefaultTooltipContent(params, xAxisTitle = null) {
      const seriesDataLength = params.seriesData.length;
      const { yLabels, tooltipContent } = params.seriesData.reduce(
        (acc, chartItem) => {
          const [value, title] = chartItem.value || [];
          // The x axis title is used instead of y axis
          const seriesName =
            seriesDataLength === 1 && xAxisTitle ? xAxisTitle : chartItem.seriesName;
          const color = seriesDataLength === 1 ? '' : chartItem.color;
          acc.tooltipContent[seriesName] = {
            value,
            color,
          };
          if (!acc.yLabels.includes(title)) {
            acc.yLabels.push(title);
          }
          return acc;
        },
        {
          yLabels: [],
          tooltipContent: {},
        }
      );

      return { yLabels, tooltipContent };
    },
  },
};
</script>

<template>
  <div class="position-relative">
    <chart
      v-bind="$attrs"
      :options="options"
      v-on="$listeners"
      @created="onCreated"
      @updated="onUpdated"
    />
    <chart-tooltip
      v-if="chart"
      :show="showTooltip"
      :chart="chart"
      :top="tooltipPosition.top"
      :left="tooltipPosition.left"
    >
      <div slot="title">{{ tooltipTitle }} ({{ yAxisTitle }})</div>
      <tooltip-default-format :tooltip-content="tooltipContent" />
    </chart-tooltip>
  </div>
</template>
