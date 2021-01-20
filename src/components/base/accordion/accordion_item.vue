<script>
import { uniqueId } from 'lodash';
import { BCollapse } from 'bootstrap-vue';
import GlButton from '../button/button.vue';
import GlCollapseToggle from '../../../directives/collapse_toggle';

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
  },
  data() {
    return {
      accordionItemId: uniqueId('accordion-item-'),
      isVisible: this.visible,
    };
  },
  computed: {
    icon() {
      return this.isVisible ? 'chevron-down' : 'chevron-right';
    },
  },
};
</script>

<template>
  <div class="gl-accordion-item">
    <gl-button
      v-gl-collapse-toggle="accordionItemId"
      variant="link"
      button-text-classes="gl-display-flex"
      role="tab"
      :icon="icon"
    >
      {{ title }}
    </gl-button>
    <b-collapse
      :id="accordionItemId"
      v-model="isVisible"
      :visible="isVisible"
      :accordion="accordion"
      class="gl-mt-3 gl-font-base"
      role="tabpanel"
    >
      <slot></slot>
    </b-collapse>
  </div>
</template>
