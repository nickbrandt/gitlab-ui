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
      'quezal',
      'badger',
      'vicuña',
      'whale',
      'xenarthra'
    ],
  data() {
    return {
      results: [],
      arrowCounter: -1,
      userDismissedResults: false,
      suggestionsId: 'token-suggestions-342',
      inputId: 'token-input-342',
      inputVal: ''
    };
  }
}
</script>

<template>
  <div>
    <gl-combobox
      v-model="inputVal"
      :token-list="$options.tokens"
      label-text="Animals We Tolerate"
    />
  </div>
</template>
