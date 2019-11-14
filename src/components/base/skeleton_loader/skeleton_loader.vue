<script>
import { uid } from '../../../utils/utils';

export default {
  props: {
    width: {
      type: Number,
      default: 400,
      required: false,
    },
    height: {
      type: Number,
      default: 130,
      required: false,
    },
    preserveAspectRatio: {
      type: String,
      default: 'xMidYMid meet',
      required: false,
    },
    baseUrl: {
      type: String,
      default: '',
      required: false,
    },
    uniqueKey: {
      type: String,
      default: () => uid(),
      required: false,
    },
  },
};
</script>

<template functional>
  <svg
    class="gl-skeleton-loader"
    :viewBox="`0 0 ${props.width} ${props.height}`"
    version="1.1"
    :preserveAspectRatio="props.preserveAspectRatio"
  >
    <rect
      :style="{ fill: `url(${props.baseUrl}#${props.uniqueKey}-idGradient)` }"
      :clip-path="`url(${props.baseUrl}#${props.uniqueKey}-idClip)`"
      x="0"
      y="0"
      :width="props.width"
      :height="props.height"
    />

    <defs>
      <clipPath :id="`${props.uniqueKey}-idClip`">
        <slot />
      </clipPath>

      <linearGradient :id="`${props.uniqueKey}-idGradient`">
        <stop offset="0%" class="primary-stop">
          <animate attributeName="offset" values="-2; 1" dur="1s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" class="secondary-stop">
          <animate attributeName="offset" values="-1.5; 1.5" dur="1s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" class="primary-stop">
          <animate attributeName="offset" values="-1; 2" dur="1s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
  </svg>
</template>
