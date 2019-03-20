<script>
import { average } from '../../../helpers/number_utils';
import { defaultFontSize } from '../../../helpers/charts/config';

export default {
  props: {
    seriesInfo: {
      type: Array,
      required: true,
      validator(seriesInfo) {
        return seriesInfo.every(series => series.type && series.name && series.color);
      },
    },
    textStyle: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  computed: {
    fontStyle() {
      return {
        fontFamily: this.textStyle.fontFamily || 'sans-serif',
        fontSize: `${this.textStyle.fontSize || defaultFontSize}px`,
      };
    },
  },
  methods: {
    formatNumber(number) {
      return Number.isInteger(number) ? number : number.toFixed(3);
    },
    seriesAverage(seriesData) {
      return this.formatNumber(average(...seriesData));
    },
    seriesMax(seriesData) {
      return this.formatNumber(Math.max(...seriesData));
    },
    pathContent(type) {
      switch (type) {
        case 'dashed':
          return 'M0,0H6V4H0V-4 M10,0H16V4H10Z';

        case 'solid':
        default:
          return 'M0,0H16V4H0Z';
      }
    },
  },
};
</script>

<template>
  <div class="d-flex flex-wrap flex-shrink-0">
    <div
      v-for="(series, key) in seriesInfo"
      :key="key"
      class="d-flex align-items-center flex-shrink-0 append-right-8"
      :style="fontStyle"
    >
      <div class="d-inline-block svg-content p-0 append-right-8">
        <svg class="d-block" :style="{fill: series.color}" width="16px" height="4px">
          <path :d="pathContent(series.type)"/>
        </svg>
      </div>
      <span class="bold append-right-8">{{ series.name }}</span>
      <span v-if="series.data && series.data.length">Avg: {{
        seriesAverage(series.data)
      }} · Max: {{
        seriesMax(series.data)
      }}</span>
    </div>
  </div>
</template>
