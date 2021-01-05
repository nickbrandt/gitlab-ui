<script>
import GlIcon from '../icon/icon.vue';
import GlButton from '../button/button.vue';
import {
  alertVariantOptions,
  alertVariantIconMap,
  newButtonCategoryOptions,
} from '../../../utils/constants';

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
            variant: 'info',
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
  <div :class="['gl-alert', variantClass]" role="alert">
    <gl-icon
      :name="iconName"
      :class="{ 'gl-alert-icon': true, 'gl-alert-icon-no-title': !title }"
    />

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
</template>
