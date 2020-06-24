<script>
import { BBreadcrumb, BBreadcrumbItem } from 'bootstrap-vue';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    GlIcon,
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [{ text: '', href: '' }],
      validator: links => links.every(link => Object.keys(link).includes('text', 'href')),
    },
    back: {
      type: Object,
      required: false,
      default: null,
      validator: option => Object.keys(option).includes('text', 'href'),
    },
  },
};
</script>
<template>
  <div class="gl-breadcrumbs">
    <b-breadcrumb class="gl-breadcrumb-list" v-bind="$attrs" v-on="$listeners">
      <template v-if="back">
        <b-breadcrumb-item class="gl-breadcrumb-item gl-breadcrumb-item-back" :href="back.href">
          <gl-icon name="go-back" :size="14" class="gl-vertical-align-text-bottom" />
          <span class="gl-breadcrumb-item-back-text">{{ back.text }}</span>
        </b-breadcrumb-item>
      </template>
      <slot name="avatar"></slot>
      <template v-for="(item, index) in items">
        <b-breadcrumb-item
          :key="index"
          class="gl-breadcrumb-item"
          :text="item.text"
          :href="item.href"
        />
        <span
          v-if="index != items.length - 1"
          :key="`index ${item.text}`"
          class="gl-breadcrumb-separator"
        >
          <slot name="separator"></slot>
        </span>
      </template>
    </b-breadcrumb>
  </div>
</template>
