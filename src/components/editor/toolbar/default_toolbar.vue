<script>
import GlButton from '../../base/button/button.vue';
import GlDropdown from '../../base/dropdown/dropdown.vue';
import GlDropdownItem from '../../base/dropdown/dropdown_item.vue';
import GlTooltip from '../../../directives/tooltip';

import { headingLevels } from '../constants';

export default {
  components: {
    GlButton,
    GlDropdown,
    GlDropdownItem,
  },
  directives: {
    GlTooltip,
  },
  props: {
    currentEditorName: {
      type: String,
      required: true,
    },
    editors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentEditor() {
      return this.editors[this.currentEditorName];
    },
    isActive() {
      return this.currentEditor?.isActive;
    },
    commands() {
      return this.currentEditor?.commands;
    },
  },
  methods: {
    activeHeadingLabel(isActive) {
      const activeLevel = headingLevels.find(level => isActive.heading({ level }));

      return activeLevel ? `Heading ${activeLevel}` : 'Paragraph';
    },
  },
  headingLevels,
};
</script>
<template>
  <div v-if="currentEditor" class="gl-display-flex gl-justify-content-center gl-mb-3">
    <gl-dropdown class="gl-mr-2" category="tertiary" :text="activeHeadingLabel(isActive)">
      <gl-dropdown-item :active="isActive.paragraph()">Paragraph</gl-dropdown-item>
      <gl-dropdown-item
        v-for="level in $options.headingLevels"
        :key="level"
        :active="isActive.heading({ level })"
        @click="commands.heading({ level })"
        >Heading {{ level }}</gl-dropdown-item
      >
    </gl-dropdown>
    <gl-button
      v-gl-tooltip
      class="gl-mr-2"
      icon="bold"
      category="tertiary"
      :class="{ active: isActive.bold() }"
      title="Bold"
      @click="commands.bold"
    />
    <gl-button
      v-gl-tooltip
      class="gl-mr-2"
      icon="italic"
      category="tertiary"
      :class="{ active: isActive.italic() }"
      title="Italic"
      @click="commands.italic"
    />
    <span
      class="gl-border-r-solid gl-border-1 gl-border-gray-100 gl-h-7 gl-mr-2 gl-display-none! gl-display-sm-flex!"
    ></span>
    <gl-button
      v-gl-tooltip
      class="gl-mr-2 gl-display-none! gl-display-sm-flex!"
      icon="list-bulleted"
      category="tertiary"
      :class="{ active: isActive.bullet_list() }"
      title="Bullet list"
      @click="commands.bullet_list"
    />
    <gl-button
      v-gl-tooltip
      class="gl-mr-2 gl-display-none! gl-display-sm-flex!"
      icon="list-numbered"
      category="tertiary"
      :class="{ active: isActive.ordered_list() }"
      title="Ordered list"
      @click="commands.ordered_list"
    />
  </div>
</template>
