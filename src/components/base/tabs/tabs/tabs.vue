<script>
import { BTabs } from "bootstrap-vue";
import { glThemes } from "../../../../utils/constants";
import GlButton from "../../button/button.vue";

export default {
  components: {
    BTabs,
    GlButton,
  },
  defaultActionButtonAttributes: {
    variant: "success",
    category: "primary",
  },
  inheritAttrs: false,
  props: {
    actions: {
      type: Array,
      required: false,
      default: () => [],
      // validator: obj => validatorHelper(obj),
    },
    theme: {
      type: String,
      required: false,
      default: "indigo",
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
    activeItemBorderClass() {
      return `gl-tab-nav-item-active-${this.theme}`;
    },
    slots() {
      console.log(this.$slots);
      return Object.keys(this.$slots).filter(name => name === "actions");
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
    <slot v-for="slot in slots" :slot="slot" :name="slot"></slot>

    <template v-if="actions" #tabs-start>
      <gl-button
        v-for="(action, i) in actions"
        :key="`${i}-top`"
        :bind="action.attributes || $options.defaultActionButtonAttributes"
        class="js-modal-action-primary"
        data-testid="action-end"
        @click="action"
      >
        {{ action.text }}
      </gl-button>
    </template>
    <template v-if="actions" #tabs-end>
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
          v-for="(action, i) in actions"
          :key="`${i}-end`"
          :bind="action.attributes || $options.defaultActionButtonAttributes"
          class="gl-mb-3 gl-lg-mr-3 gl-lg-mb-0"
          data-testid="action-end"
          @click="action"
        >
          {{ action.text }}
        </gl-button>
      </div>
    </template>
  </b-tabs>
</template>
