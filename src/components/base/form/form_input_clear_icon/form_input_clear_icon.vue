<script>
import ClearIconButton from '../../../shared_components/clear_icon_button/clear_icon_button.vue';
import GlFormInput from '../form_input/form_input.vue';

export default {
  components: {
    GlFormInput,
    ClearIconButton,
  },
};
</script>

<template>
  <div class="gl-form-input-clear-icon">
    <gl-form-input type="text" />

    <clear-icon-button
      value="in progress"
      aria-hidden="true"
      name="clear"
      title="Clear"
    />
  </div>
</template>
