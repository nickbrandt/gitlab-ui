<script>
import { avatarShapeOptions, avatarSizeOptions } from '../../../utils/constants';

const IDENTICON_BG_COUNT = 7;

export default {
  props: {
    entityId: {
      type: Number,
      required: false,
      default: 0,
    },
    entityName: {
      type: String,
      required: false,
      default: '',
    },
    src: {
      type: String,
      required: false,
      default: '',
    },
    alt: {
      type: String,
      required: false,
      default: 'avatar',
    },
    size: {
      type: Number,
      required: false,
      default: avatarSizeOptions[1],
      validator: (value) => {
        const invalid = avatarSizeOptions.includes(value);

        if (invalid) {
          /* eslint-disable-next-line no-console */
          console.error(`Avatar size should be one of ${avatarSizeOptions}`);
        }

        return invalid;
      },
    },
    shape: {
      type: String,
      required: false,
      default: avatarShapeOptions.circle,
    },
  },
  computed: {
    sizeClass() {
      return `gl-avatar-s${this.size}`;
    },
    isCircle() {
      return this.shape === avatarShapeOptions.circle;
    },
    identiconBackgroundClass() {
      /*
       * Gets a number between 1-7 depending on the 'entityId'.
       * Gets the remainder after dividing the 'entityId' by the number of available backgrounds.
       */
      const type = (this.entityId % IDENTICON_BG_COUNT) + 1;
      return `gl-avatar-identicon-bg${type}`;
    },
    identiconText() {
      return this.entityName ? this.entityName.charAt(0).toUpperCase() : '';
    },
  },
};
</script>
<template>
  <img
    v-if="src"
    :src="src"
    :alt="alt"
    :class="['gl-avatar', { 'gl-avatar-circle': isCircle }, sizeClass]"
  />
  <div
    v-else
    :class="[
      'gl-avatar gl-avatar-identicon',
      { 'gl-avatar-circle': isCircle },
      sizeClass,
      identiconBackgroundClass,
    ]"
  >
    {{ identiconText }}
  </div>
</template>
