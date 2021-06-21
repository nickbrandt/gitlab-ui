<script>
import { BBreadcrumb, BBreadcrumbItem } from 'bootstrap-vue';

export default {
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
  },
  inheritAttrs: false,
  props: {
    /**
     * The breadcrumb items to be displayed as links.
     */
    items: {
      type: Array,
      required: true,
      default: () => [{ text: '', href: '' }],
      validator: (links) => {
        return links.every((link) => {
          const keys = Object.keys(link);
          return keys.includes('text') && (keys.includes('href') || keys.includes('to'));
        });
      },
    },
  },
};
</script>
<template>
  <div class="gl-breadcrumbs">
    <b-breadcrumb class="gl-breadcrumb-list" v-bind="$attrs" v-on="$listeners">
      <!-- @slot The avatar to display. -->
      <slot name="avatar"></slot>
      <template v-for="(item, index) in items">
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <b-breadcrumb-item
          class="gl-breadcrumb-item"
          :text="item.text"
          :href="item.href"
          :to="item.to"
        />
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <span
          v-if="index != items.length - 1"
          class="gl-breadcrumb-separator"
          data-testid="separator"
        >
          <!-- @slot The separator to display. -->
          <slot name="separator"></slot>
        </span>
      </template>
    </b-breadcrumb>
  </div>
</template>
