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
      validator: value => avatarSizeOptions.includes(value),
    },
    shape: {
      type: String,
      required: false,
      default: avatarShapeOptions.circle,
    },
  },
  computed: {
    sizeClass() {
      return `s${this.size}`;
    },
    shapeClass() {
      return this.shape === avatarShapeOptions.rect ? 'rect-avatar' : '';
    },
    identiconBackgroundClass() {
      /*
      * Gets a number between 1-7 depending on the 'entityId'.
      * Gets the remainder after dividing the 'entityId' by the number of available backgrounds.
      */
      const type = (this.entityId % IDENTICON_BG_COUNT) + 1;
      return `bg${type}`;
    },
    identiconText() {
      return this.entityName ? this.entityName.charAt(0).toUpperCase() : '';
    },
  },
};
</script>

<template>
  <img v-if="src" :src="src" :alt="alt" class="avatar" :class="[sizeClass, shapeClass]"/>
  <div v-else :class="[sizeClass, shapeClass, identiconBackgroundClass]" class="avatar identicon d-flex justify-content-center flex-column">
    {{ identiconText }}
  </div>
</template>
