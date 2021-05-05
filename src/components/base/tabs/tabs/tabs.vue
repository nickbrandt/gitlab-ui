<script>
import { BTabs } from 'bootstrap-vue';
import { colorThemes, tabsButtonDefaults } from '../../../../utils/constants';
import GlButton from '../../button/button.vue';

const validatorHelper = (obj) =>
  Object.keys(obj).every((val) => val === 'text' || val === 'attributes');

export default {
  components: {
    BTabs,
    GlButton,
  },
  inheritAttrs: false,
  props: {
    actionPrimary: {
      type: Object,
      required: false,
      default: null,
      validator: (obj) => validatorHelper(obj),
    },
    actionSecondary: {
      type: Object,
      required: false,
      default: null,
      validator: (obj) => validatorHelper(obj),
    },
    actionTertiary: {
      type: Object,
      required: false,
      default: null,
      validator: (obj) => validatorHelper(obj),
    },
    theme: {
      type: String,
      required: false,
      default: 'indigo',
      validator: (value) => Object.keys(colorThemes).includes(value) || value === 'gl-dark',
    },
    contentClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    navClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    justified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    hasActions() {
      return [this.actionPrimary, this.actionSecondary, this.actionTertiary].some(Boolean);
    },
    activeItemBorderClass() {
      return `gl-tab-nav-item-active-${this.theme}`;
    },
  },
  methods: {
    buttonBinding(prop, name) {
      if (!prop.attributes) {
        return tabsButtonDefaults[name];
      }
      return prop.attributes;
    },
    primary() {
      this.$emit('primary');
    },
    secondary() {
      this.$emit('secondary');
    },
    tertiary() {
      this.$emit('tertiary');
    },
  },
};
</script>

<template>
  <b-tabs
    :no-nav-style="true"
    :no-fade="true"
    :active-nav-item-class="`gl-tab-nav-item-active ${activeItemBorderClass}`"
    :content-class="[contentClass, 'gl-tab-content']"
    :nav-class="[navClass, 'gl-tabs-nav']"
    :justified="justified"
    class="gl-tabs"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>

    <template v-if="hasActions" #tabs-start>
      <div data-testid="actions-tabs-start" class="gl-actions-tabs-start">
        <gl-button
          v-if="actionPrimary"
          data-testid="action-primary"
          v-bind="buttonBinding(actionPrimary, 'actionPrimary')"
          @click="primary"
        >
          {{ actionPrimary.text }}
        </gl-button>
        <gl-button
          v-if="actionSecondary"
          data-testid="action-secondary"
          v-bind="buttonBinding(actionSecondary, 'actionSecondary')"
          @click="secondary"
        >
          {{ actionSecondary.text }}
        </gl-button>
        <gl-button
          v-if="actionTertiary"
          data-testid="action-tertiary"
          v-bind="buttonBinding(actionTertiary, 'actionTertiary')"
          @click="tertiary"
        >
          {{ actionTertiary.text }}
        </gl-button>
      </div>
    </template>
    <template v-if="hasActions" #tabs-end>
      <div data-testid="actions-tabs-end" class="gl-actions-tabs-end">
        <gl-button
          v-if="actionPrimary"
          data-testid="action-primary"
          v-bind="buttonBinding(actionPrimary, 'actionPrimary')"
          @click="primary"
        >
          {{ actionPrimary.text }}
        </gl-button>
        <gl-button
          v-if="actionSecondary"
          data-testid="action-secondary"
          v-bind="buttonBinding(actionSecondary, 'actionSecondary')"
          @click="secondary"
        >
          {{ actionSecondary.text }}
        </gl-button>
        <gl-button
          v-if="actionTertiary"
          data-testid="action-tertiary"
          v-bind="buttonBinding(actionTertiary, 'actionTertiary')"
          @click="tertiary"
        >
          {{ actionTertiary.text }}
        </gl-button>
      </div>
    </template>
  </b-tabs>
</template>
