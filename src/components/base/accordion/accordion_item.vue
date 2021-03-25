<script>
import { BCollapse } from 'bootstrap-vue';
import { uniqueId } from 'lodash';
import GlCollapseToggle from '../../../directives/collapse_toggle';
import GlButton from '../button/button.vue';

export default {
  name: 'GlAccordionItem',
  components: {
    BCollapse,
    GlButton,
  },
  directives: {
    GlCollapseToggle,
  },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
      required: false,
    },
    accordion: {
      type: String,
      default: '',
      required: false,
    },
    headerLevel: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      accordionItemId: uniqueId('accordion-item-'),
      isVisible: this.visible,
    };
  },
  computed: {
    headerComponent() {
      return `h${this.headerLevel}`;
    },
    icon() {
      return this.isVisible ? 'chevron-down' : 'chevron-right';
    },
  },
};
</script>

<template>
  <div class="gl-accordion-item">
    <component :is="headerComponent" class="gl-accordion-item-header">
      <gl-button
        v-gl-collapse-toggle="accordionItemId"
        variant="link"
        button-text-classes="gl-display-flex"
        :icon="icon"
      >
        {{ title }}
      </gl-button>
    </component>
    <b-collapse
      :id="accordionItemId"
      v-model="isVisible"
      :visible="isVisible"
      :accordion="accordion"
      class="gl-mt-3 gl-font-base"
    >
      <slot></slot>
    </b-collapse>
  </div>
</template>
