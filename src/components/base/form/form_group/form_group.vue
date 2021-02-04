<script>
import { BFormGroup } from 'bootstrap-vue';
import { isString, isArray, isPlainObject } from 'lodash';

export const validationStates = {
  DEFAULT: null,
  VALID: 'VALID',
  INVALID: 'INVALID',
  WARNING: 'WARNING',
};

export default {
  components: {
    BFormGroup,
  },
  inheritAttrs: false,
  props: {
    labelClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    state: {
      type: [String, Boolean],
      required: false,
      default: validationStates.DEFAULT,
    },
    validFeedback: {
      type: String,
      required: false,
      default: null,
    },
    warningFeedback: {
      type: String,
      required: false,
      default: null,
    },
    invalidFeedback: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    actualLabelClass() {
      const { labelClass } = this;
      const defaultClass = 'col-form-label';

      if (isString(labelClass)) {
        return `${labelClass} ${defaultClass}`;
      }
      if (isArray(labelClass)) {
        return [...labelClass, defaultClass];
      }
      if (isPlainObject(labelClass)) {
        return { ...labelClass, [defaultClass]: true };
      }
      return defaultClass;
    },
    isValid() {
      return this.state === validationStates.VALID || this.state === true;
    },
    isWarning() {
      return this.state === validationStates.WARNING;
    },
    isInvalid() {
      return this.state === validationStates.INVALID || this.state === false;
    },
    formValidationClass() {
      const defaultValidationClass = '';

      if (this.isValid) {
        return 'gl-is-valid';
      }
      if (this.isInvalid) {
        return 'gl-is-invalid';
      }
      if (this.isWarning) {
        return 'gl-is-warning';
      }
      return defaultValidationClass;
    },
  },
  feedbackTextClass: 'gl-font-base gl-line-height-normal gl-mt-3',
};
</script>
<template>
  <b-form-group
    v-bind="$attrs"
    :class="['gl-form-group', formValidationClass]"
    :label-class="actualLabelClass"
  >
    <slot></slot>
    <slot slot="description" name="description"></slot>
    <slot slot="label" name="label"></slot>
    <div v-if="isValid" :class="$options.feedbackTextClass" class="gl-text-green-500">
      <slot name="valid-feedback">{{ validFeedback }}</slot>
    </div>
    <div v-if="isWarning" :class="$options.feedbackTextClass" class="gl-text-orange-500">
      <slot name="warning-feedback">{{ warningFeedback }}</slot>
    </div>
    <div v-if="isInvalid" :class="$options.feedbackTextClass" class="gl-text-red-500">
      <slot name="invalid-feedback">{{ invalidFeedback }}</slot>
    </div>
  </b-form-group>
</template>
