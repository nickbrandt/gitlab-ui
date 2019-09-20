<script>
import BFormInput from 'bootstrap-vue/src/components/form-input/form-input';
import GlButton from '../../button/button.vue';

export default {
  components: {
    BFormInput,
    GlButton,
  },
  data() {
    return {
      userInput: '',
    }
  },
  computed: {
    inputLength() {
      return this.userInput.length;
    }
  },
  inheritAttrs: false,
};
</script>

<template>
  <div class="gl-form-input gl-form-input-placeholder">
    <b-form-input v-model="userInput" class="gl-form-input" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>
