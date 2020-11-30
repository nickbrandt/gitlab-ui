<script>
import { uniqueId } from 'lodash';
import { BCollapse } from 'bootstrap-vue';
import GlIcon from '../icon/icon.vue';
import GlButton from '../button/button.vue';
import GlCollapseToggleDirective from '../../../directives/collapse_toggle';

export default {
  name: 'GlAccordionItem',
  components: {
    BCollapse,
    GlButton,
    GlIcon,
  },
  directives: {
    GlCollapseToggleDirective,
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
      isVisible: false,
      icon: 'chevron-right',
    };
  },
  mounted() {
    if (this.visible) {
      this.isVisible = true;
    }
  },
  methods: {
    toggleCollapse(isCollapse) {
      this.icon = isCollapse ? 'chevron-down' : 'chevron-right';
    },
  },
};
</script>

<template>
  <div>
    <gl-button
      v-gl-collapse-toggle="accordionItemId"
      variant="link"
      button-text-classes="gl-display-flex"
      role="tab"
    >
      <gl-icon :name="icon" class="mr-1" />
      <span>{{ title }}</span>
    </gl-button>
    <b-collapse
      :id="accordionItemId"
      :visible="isVisible"
      :accordion="accordion"
      class="gl-mt-1 gl-transition-medium"
      role="tabpanel"
      @input="toggleCollapse"
    >
      <span class="gl-w-5 gl-display-inline-block"><!-- spacer so it aligns gl-icon width--></span>
      <slot></slot>
    </b-collapse>
  </div>
</template>
