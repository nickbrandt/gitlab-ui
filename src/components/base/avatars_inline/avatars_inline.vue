<script>
import { avatarsInlineSizeOptions } from '../../../utils/constants';
import GlAvatar from '../avatar/avatar.vue';

export default {
  name: 'AvatarsInline',
  components: {
    GlAvatar,
  },
  props: {
    avatars: {
      type: Array,
      required: true,
    },
    maxVisible: {
      type: Number,
      required: true,
    },
    avatarSize: {
      type: Number,
      required: true,
      validator: value => avatarsInlineSizeOptions.includes(value),
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    hiddenAvatars() {
      return this.avatars.length - this.maxVisible;
    },
    collapsable() {
      return this.hiddenAvatars > 0;
    },
    visibleAvatars() {
      return this.collapsed ? this.avatars.slice(0, this.maxVisible) : this.avatars;
    },
    containerSizeStyles() {
      return {
        width: `${this.avatarSize * this.visibleAvatars.length}px`,
        height: `${this.avatarSize}px`,
      };
    },
    badgeSize() {
      return this.avatarSize === 24 ? 'md' : 'lg';
    },
    badgeLabel() {
      return `+${this.hiddenAvatars}`;
    },
  },
  methods: {
    calcAvatarPosition(avatarIndex) {
      // According to pajamas, overlap is 25% of the avatar height
      const overlapDistance = this.avatarSize * 0.75;

      return {
        left: `${overlapDistance * avatarIndex}px`,
        zIndex: this.maxVisible - avatarIndex,
      };
    },
  },
};
</script>
<template>
  <div :class="['gl-avatars-inline', { collapsed: collapsed }]" :style="containerSizeStyles">
    <div
      v-for="(avatar, index) in visibleAvatars"
      :key="index"
      class="gl-avatars-inline-child"
      :style="calcAvatarPosition(index)"
    >
      <slot name="avatar" :avatar="avatar">
        <gl-avatar v-bind="avatar" :size="avatarSize" />
      </slot>
    </div>
    <div
      v-if="collapsed && collapsable"
      class="gl-avatars-inline-child"
      :style="calcAvatarPosition(visibleAvatars.length)"
    >
      <span :class="['gl-avatars-inline-badge', badgeSize]">
        {{ badgeLabel }}
      </span>
    </div>
  </div>
</template>
