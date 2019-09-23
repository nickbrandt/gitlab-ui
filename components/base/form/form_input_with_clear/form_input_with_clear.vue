<script>
import GlButton from '../../button/button.vue';
import GlFormInput from '../form_input/form_input.vue';

export default {
  components: {
    GlFormInput,
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
  <div>
    <gl-form-input v-model="userInput"/>
    <i class="fa fa-times" />
  </div>
</template>