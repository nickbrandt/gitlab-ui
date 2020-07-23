<script>
import GlDeprecatedButton from '../deprecated_button/deprecated_button.vue';
import GlButtonGroup from '../button_group/button_group.vue';
import GlDeprecatedDropdown from '../deprecated_dropdown/deprecated_dropdown.vue';
import GlTooltip from '../../../directives/tooltip';
import GlIcon from '../icon/icon.vue';

export default {
  name: 'GlSorting',
  components: {
    GlDeprecatedButton,
    GlButtonGroup,
    GlDeprecatedDropdown,
    GlIcon,
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
    <gl-deprecated-dropdown v-bind="$props" :text="text" toggle-class="dropdown-menu-toggle" right>
      <slot></slot>
    </gl-deprecated-dropdown>
    <gl-deprecated-button
      v-gl-tooltip
      :title="sortDirectionToolTip"
      class="sorting-direction-button"
      @click="toggleSortDirection"
    >
      <gl-icon :name="localSortDirection" :aria-label="sortDirectionAriaLabel" :size="16" />
    </gl-deprecated-button>
  </gl-button-group>
</template>
