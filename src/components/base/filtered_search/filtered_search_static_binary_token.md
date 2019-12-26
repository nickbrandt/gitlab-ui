# Filtered Search Static Binary Token

A filtered-search static binary token is a filtered-search token with a fixed
suggestions list displayed without autocomplete.

This component is not intended to be used outside of `GlFilteredSearch` component.

## Usage

Make sure to pass `$listeners` to `gl-filtered-static-binary-token` or properly route the events:

```js
<gl-filtered-search-static-binary-token
  title="Confidential"
  :items="[
     { icon: 'eye-slash', value: true, title: 'Yes' },
     { icon: 'eye', value: false, title: 'No' }
  ]"
  :active="active"
  :value="value"
  v-on="$listeners"
/>
```
