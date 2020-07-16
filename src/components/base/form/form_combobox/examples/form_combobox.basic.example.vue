<script>
export default {
  tokens: [
    'giraffe',
    'dog',
    'dodo',
    'komodo dragon',
    'hippo',
    'platypus',
    'jackalope',
    'quetzal',
    'badger',
    'vicuña',
    'whale',
    'xenarthra',
  ],
  data() {
    return {
      inputVal: '',
    };
  },
};
</script>

<template>
  <gl-form-combobox
    v-model="inputVal"
    :token-list="$options.tokens"
    label-text="Animals We Tolerate"
  />
</template>
