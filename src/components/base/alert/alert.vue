<script>
import {
  alertVariantOptions,
  alertVariantIconMap,
  newButtonCategoryOptions,
} from '../../../utils/constants';
import GlButton from '../button/button.vue';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    GlIcon,
    GlButton,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    dismissible: {
      type: Boolean,
      required: false,
      default: true,
    },
    dismissLabel: {
      type: String,
      required: false,
      default: 'Dismiss',
    },
    variant: {
      type: String,
      required: false,
      default: alertVariantOptions.info,
      validator: (value) => Object.keys(alertVariantOptions).includes(value),
    },
    primaryButtonLink: {
      type: String,
      required: false,
      default: '',
    },
    primaryButtonText: {
      type: String,
      required: false,
      default: '',
    },
    secondaryButtonLink: {
      type: String,
      required: false,
      default: '',
    },
    secondaryButtonText: {
      type: String,
      required: false,
      default: '',
    },
    contained: {
      type: Boolean,
      required: false,
      default: false,
    },
    sticky: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    iconName() {
      return alertVariantIconMap[this.variant];
    },
    shouldRenderActions() {
      return Boolean(this.$slots.actions || this.actionButtons.length);
    },
    actionButtons() {
      return [
        {
          text: this.primaryButtonText,
          attrs: {
            href: this.primaryButtonLink,
            variant: 'confirm',
            category: newButtonCategoryOptions.primary,
          },
          listeners: {
            click: this.primaryButtonClicked,
          },
        },
        {
          text: this.secondaryButtonText,
          attrs: {
            href: this.secondaryButtonLink,
            variant: 'default',
            category: newButtonCategoryOptions.secondary,
          },
          listeners: {
            click: this.secondaryButtonClicked,
          },
        },
      ].reduce((acc, actionButton) => {
        if (!actionButton.text) return acc;

        const attrs = { ...actionButton.attrs };
        if (!attrs.href) {
          delete attrs.href;
        }

        acc.push({ ...actionButton, attrs });
        return acc;
      }, []);
    },
    variantClass() {
      return `gl-alert-${this.variant}`;
    },
  },
  methods: {
    primaryButtonClicked(event) {
      this.$emit('primaryAction', event);
    },
    secondaryButtonClicked(event) {
      this.$emit('secondaryAction', event);
    },
    onDismiss() {
      this.$emit('dismiss');
    },
  },
};
</script>

<template>
  <div
    :class="[
      'gl-alert',
      { 'gl-alert-max-content': contained },
      { 'gl-alert-sticky': sticky },
      variantClass,
    ]"
  >
    <div class="gl-alert-container">
      <gl-icon
        :name="iconName"
        :class="{ 'gl-alert-icon': true, 'gl-alert-icon-no-title': !title }"
      />

      <div class="gl-alert-content" role="alert">
        <h4 v-if="title" class="gl-alert-title">{{ title }}</h4>

        <div class="gl-alert-body">
          <slot></slot>
        </div>

        <div v-if="shouldRenderActions" class="gl-alert-actions">
          <slot name="actions">
            <gl-button
              v-for="(actionButton, index) in actionButtons"
              :key="index"
              class="gl-alert-action"
              v-bind="actionButton.attrs"
              v-on="actionButton.listeners"
            >
              {{ actionButton.text }}
            </gl-button>
          </slot>
        </div>
      </div>

      <button
        v-if="dismissible"
        ref="dismiss"
        type="button"
        class="gl-alert-dismiss"
        :aria-label="dismissLabel"
        @click="onDismiss"
      >
        <gl-icon name="close" />
      </button>
    </div>
  </div>
</template>
