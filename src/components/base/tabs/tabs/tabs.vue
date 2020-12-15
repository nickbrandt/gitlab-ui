<script>
import { BTabs } from 'bootstrap-vue';
import { glThemes, modalButtonDefaults } from '../../../../utils/constants';
import GlButton from '../../button/button.vue';

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
      // validator: obj => validatorHelper(obj),
    },
    actionSecondary: {
      type: Object,
      required: false,
      default: null,
      // validator: obj => validatorHelper(obj),
    },
    actionTertiary: {
      type: Object,
      required: false,
      default: null,
      // validator: obj => validatorHelper(obj),
    },
    theme: {
      type: String,
      required: false,
      default: 'indigo',
      validator: theme => glThemes.includes(theme),
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
    slots() {
      console.log(this.$slots);
      return Object.keys(this.$slots).filter(name => name === 'actions');
    },
  },
  methods: {
    buttonBinding(prop, name) {
      if (!prop.attributes) {
        return modalButtonDefaults[name];
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
  }
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
    <slot v-for="slot in slots" :slot="slot" :name="slot"></slot>

    <template v-if="hasActions" #tabs-start>
      <gl-button
        v-if="actionPrimary"
        class="js-modal-action-primary"
        v-bind="buttonBinding(actionPrimary, 'actionPrimary')"
        @click="primary"
      >
        {{ actionPrimary.text }}
      </gl-button>
      <gl-button
        v-if="actionSecondary"
        class="js-modal-action-secondary"
        v-bind="buttonBinding(actionSecondary, 'actionSecondary')"
        @click="secondary"
      >
        {{ actionSecondary.text }}
      </gl-button>
      <gl-button
        v-if="actionTertiary"
        class="js-modal-action-cancel"
        v-bind="buttonBinding(actionTertiary, 'actionSecondary')"
        @click="tertiary"
      >
        {{ actionTertiary.text }}
      </gl-button>
    </template>
    <template v-if="hasActions" #tabs-end>
      <div
        class="
            gl-display-none
            gl-display-md-flex
            gl-lg-align-items-center
            gl-lg-flex-direction-row
            gl-lg-flex-fill-1
            gl-lg-justify-content-end
            gl-lg-mt-0"
      >
        <gl-button
          v-if="actionPrimary"
          class="js-modal-action-primary"
          v-bind="buttonBinding(actionPrimary, 'actionPrimary')"
          @click="primary"
        >
          {{ actionPrimary.text }}
        </gl-button>
        <gl-button
          v-if="actionSecondary"
          class="js-modal-action-secondary"
          v-bind="buttonBinding(actionSecondary, 'actionSecondary')"
          @click="secondary"
        >
          {{ actionSecondary.text }}
        </gl-button>
        <gl-button
          v-if="actionTertiary"
          class="js-modal-action-cancel"
          v-bind="buttonBinding(actionTertiary, 'actionSecondary')"
          @click="tertiary"
        >
          {{ actionTertiary.text }}
        </gl-button>
      </div>
    </template>
  </b-tabs>
</template>
