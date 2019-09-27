<script>
import merge from 'lodash/merge';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import { debounceByAnimationFrame } from '../../../utils/utils';

const defaultOptions = {
  series: {
    type: 'treemap',
    label: {
      formatter: '{b}',
      color: '#000',
    },
    breadcrumb: {
      show: false,
    },
    drillDownIcon: '',
    roam: false,
    nodeClick: false, // Need to add a custom event click handler here, can be done in follow up iteration
    leafDepth: 2,
    upperLabel: {
      show: true,
      position: 'insideTopLeft',
      color: '#000',
      fontWeight: 'bold',
      fontSize: 14,
    },
    colorMappingBy: 'value',
    itemStyle: {
      normal: {
        borderWidth: 3,
        borderColor: 'white',
        gapWidth: 3,
      },
    },
  },
  legend: {
    show: false,
  },
  // Have to add an the hidden axis else co-ords aren't plottable on a treemap
  xAxis: {
    show: false,
    name: 'xAxis',
  },
  yAxis: {
    show: false,
    name: 'yAxis',
  },
};

const defaultColors = ['#d8eddd', '#b1dbbc', '#8bc99a', '#6cb879', '#efae44', '#d16d51'];

export default {
  components: {
    Chart,
    ChartTooltip,
  },
  mixins: [ToolboxMixin],
  props: {
    data: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    formatTooltipText: {
      type: Function,
      required: false,
      default: null,
    },
    showLabels: {
      type: Boolean,
      required: false,
      default: false,
    },
    colors: {
      type: Array,
      required: false,
      default: defaultColors,
    },
  },
  data() {
    return {
      chart: null,
      showTooltip: false,
      tooltipTitle: '',
      tooltipContent: '',
      tooltipPosition: {
        left: '0',
        top: '0',
      },
      debouncedShowHideTooltip: debounceByAnimationFrame(this.showHideTooltip),
      selectedFormatTooltipText: this.formatTooltipText || this.defaultFormatTooltipText,
    };
  },
  computed: {
    computedOptions() {
      return merge(
        {},
        defaultOptions,
        {
          tooltip: {
            formatter: this.onLabelChange,
          },
          series: {
            label: {
              show: this.showLabels,
            },
            levels: [
              {
                color: this.colors,
                visualMin: 0,
                visualMax: this.getMaxValue(),
              },
              {
                color: this.colors,
                visualMin: 0,
                visualMax: this.getMaxValue(1),
              },
            ],
            data: this.data,
          },
        },
        this.toolboxAdjustments,
        this.options
      );
    },
  },
  methods: {
    getMaxValue(step = 0) {
      const flatternedData = this.flatternData(this.data, step);

      const values = _.map(flatternedData, 'value');
      const max = Math.max(...values);

      return max;
    },
    flatternData(data, step) {
      if (!step) return data;

      const flatternedData = _.map(data, 'children')
        .flat()
        .filter(obj => obj !== undefined);

      const nextStep = step - 1;

      return this.flatternData(flatternedData, nextStep);
    },
    defaultFormatTooltipText(params) {
      const { data } = params;
      const { name, value } = data;
      this.tooltipTitle = name;
      this.tooltipContent = `Value: ${value}`;
    },
    onCreated(chart) {
      chart.getDom().addEventListener('mousemove', this.debouncedShowHideTooltip);
      chart.getDom().addEventListener('mouseout', this.debouncedShowHideTooltip);
      this.chart = chart;
      this.$emit('created', chart);
    },
    showHideTooltip(mouseEvent) {
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);

      this.tooltipPosition = {
        left: `${mouseEvent.zrX + 20}px`,
        top: `${mouseEvent.zrY + 60}px`,
      };
    },
    onUpdated(chart) {
      this.$emit('updated', chart);
    },
    onLabelChange(params) {
      this.selectedFormatTooltipText(params);
    },
  },
};
</script>

<template>
  <div>
    <chart
      v-bind="$attrs"
      v-on="$listeners"
      :options="computedOptions"
      @created="onCreated"
      @updated="onUpdated"
    />
    <chart-tooltip
      v-if="chart"
      :show="showTooltip"
      :chart="chart"
      :top="tooltipPosition.top"
      :left="tooltipPosition.left"
      placement="top"
    >
      <template v-if="formatTooltipText">
        <slot slot="title" name="tooltipTitle"></slot>
        <slot name="tooltipContent"></slot>
      </template>
      <template v-else>
        <div slot="title">{{ tooltipTitle }}</div>
        <div>{{ tooltipContent }}</div>
      </template>
    </chart-tooltip>
  </div>
</template>
