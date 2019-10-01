<script>
import BFormInput from 'bootstrap-vue/src/components/form-input/form-input';
import GlButton from '../../button/button.vue';

export default {
  components: {
    BFormInput,
    GlButton,
  },
  inheritAttrs: false,
  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userInput: '',
    };
  },
  computed: {
    isClearable() {
      return this.clearable && this.userInput.length > 0;
    },
  },
  methods: {
    clearInput() {
      this.userInput = '';
      this.$refs.input.focus();
    },
  },
};
</script>

<template>
  <div class="gl-form-input">
    <b-form-input
      ref="input"
      class="border-0"
      v-model="userInput"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <gl-button @click="clearInput" class="clear-button" v-if="isClearable">
      <i aria-hidden="true" class="fa fa-times-circle"></i>
    </gl-button>
  </div>
</template>
