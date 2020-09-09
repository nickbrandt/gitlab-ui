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
      return this.isAscending ? 'sort-lowest' : 'sort-highest';
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
      :icon="localSortDirection"
      :aria-label="sortDirectionAriaLabel"
      @click="toggleSortDirection"
    />
  </gl-button-group>
</template>
