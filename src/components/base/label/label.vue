<script>
import GlLink from '../link/link.vue';
import GlPopover from '../popover/popover.vue';
import GlIcon from '../icon/icon.vue';
import { labelColorOptions } from '../../../utils/constants';
import { blackNormal } from '../../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

const titleColorClassMap = {
  [labelColorOptions.dark]: 'gl-label-text-black',
  [labelColorOptions.light]: 'gl-label-text-light',
};

export default {
  components: {
    GlLink,
    GlPopover,
    GlIcon,
  },
  props: {
    color: {
      type: String,
      required: true,
      validator(value) {
        return labelColorOptions[value];
      },
    },
    backgroundColor: {
      type: String,
      required: true,
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
    tooltipPlacement: {
      type: String,
      required: false,
      default: 'top',
    },
    target: {
      type: String,
      required: false,
      default: '#',
    },
    scopedLabelsDocumentationLink: {
      type: String,
      required: false,
      default: '#',
    },
  },
  data() {
    return {
      splitScopedLabel: this.title.split('::'),
    };
  },
  computed: {
    cssClasses() {
      return {
        'gl-label-sm': this.size === 'sm',
        'gl-label-scoped': this.scopedValue,
      };
    },
    titleColorClass() {
      return titleColorClassMap[this.color];
    },
    scopedKey() {
      return this.splitScopedLabel.length > 1 ? this.splitScopedLabel[0] : this.title;
    },
    scopedValue() {
      return this.splitScopedLabel[1];
    },
    scopedValueColor() {
      return this.color === 'dark' ? blackNormal : this.backgroundColor;
    },
    boxShadow() {
      return {
        boxShadow: `inset 0 0 0 ${this.size === 'sm' ? '1px' : '2px'} ${this.backgroundColor}`,
      };
    },
  },
  watch: {
    title() {
      this.splitScopedLabel = this.title.split('::');
    },
  },
};
</script>

<template>
  <span
    :id="title"
    :class="[titleColorClass, cssClasses]"
    :style="boxShadow"
    class="gl-label"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <gl-link ref="labelTitle" :href="target" class="gl-label-link">
      <span class="gl-label-text" :style="{ backgroundColor }">{{ scopedKey }}</span>
      <span
        v-if="scopedValue"
        class="gl-label-text"
        :style="{
          color: scopedValueColor,
        }"
      >
        {{ scopedValue }}
        <gl-link class="gl-label-icon" :href="scopedLabelsDocumentationLink">
          <gl-icon name="question" :size="12" />
        </gl-link>
      </span>
    </gl-link>
    <gl-popover
      v-if="description"
      :target="title"
      :placement="tooltipPlacement"
      :title="scopedValue"
      triggers="hover focus"
      :content="description"
    />
  </span>
</template>
