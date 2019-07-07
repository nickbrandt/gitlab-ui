<script>
import GlLink from '../link/link.vue';
import GlTooltip from '../tooltip/tooltip.vue';
import GlBadge from '../badge/badge.vue';

export default {
  components: {
    GlLink,
    GlTooltip,
    GlBadge,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: '',
    },
    variant: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    cssClasses() {
      return [
        this.size === 'sm' ? 'gl-label-sm' : '',
        'gl-label',
        this.variant ? `gl-label-${this.variant}` : '',
      ];
    },
    labelTarget() {
      return this.target || '#';
    },
    scopedTitle() {
      if (this.title.indexOf('::') !== -1) {
        const splitTitle = this.title.split('::');

        return splitTitle;
      }

      return [this.title];
    },
  },
};
</script>

<template>
  <gl-badge
    :class="cssClasses"
    :style="{borderColor: backgroundColor}"
    pill
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <gl-link :ref="'labelTitleRef'" :href="labelTarget" :style="{color}" class="js-label-wrapper text-decoration-none">
      <slot>
        <span class="gl-label-text" :style="{ backgroundColor, color }">{{ scopedTitle[0] }}</span>
        <span
          v-if="scopedTitle[1]"
          class="gl-label-text"
          :style="{
            backgroundColor: color,
            color: backgroundColor
          }">
            {{ scopedTitle[1] }}
        </span>
      </slot>
    </gl-link>
    <gl-tooltip v-if="description" :target="() => $refs.labelTitleRef" class="js-label-desc" placement="top" boundary="viewport">
      {{ description }}
    </gl-tooltip>
  </gl-badge>
</template>
