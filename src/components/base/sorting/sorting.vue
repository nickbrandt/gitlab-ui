<script>
import GlButton from '../button/button.vue';
import GlButtonGroup from '../button_group/button_group.vue';
import GlDropdown from '../dropdown/dropdown.vue';
import GlTooltip from '../../../directives/tooltip';

export default {
  name: 'GlSorting',
  components: {
    GlButton,
    GlButtonGroup,
    GlDropdown,
  },
  directives: {
    GlTooltip,
  },
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    isAscending: {
      type: Boolean,
      required: false,
      default: false,
    },
    sortDirectionToolTip: {
      type: String,
      required: false,
      default: 'Sort direction',
    },
  },
  computed: {
    localSortDirection() {
      return this.isAscending ? 'fa-sort-amount-asc' : 'fa-sort-amount-desc';
    },
    sortDirectionAriaLabel() {
      return this.isAscending ? 'Sorting Direction: Ascending' : 'Sorting Direction: Descending';
    },
  },
  methods: {
    toggleSortDirection() {
      const newDirection = !this.isAscending;
      this.$emit('sortDirectionChange', newDirection);
    },
  },
};
</script>

<template>
  <gl-button-group class="gl-sorting">
    <gl-dropdown v-bind="$props" :text="text" toggle-class="dropdown-menu-toggle" right>
      <slot></slot>
    </gl-dropdown>
    <gl-button
      v-gl-tooltip
      :title="sortDirectionToolTip"
      class="sorting-direction-button"
      @click="toggleSortDirection"
    >
      <!-- TODO: Replace with GitLab UI icon when available -->
      <i class="fa" :class="localSortDirection" :aria-label="sortDirectionAriaLabel"></i>
    </gl-button>
  </gl-button-group>
</template>
