# GlFormRadio

A radio button typically represents a single option in a group of related
choices. Each radio button is boolean and only one can be selected at a time.

## Usage

`GlFormRadio` components can be used directly, or via a `GlFormRadioGroup`.

Below is an example which demonstrates the direct approach. For examples using
`GlFormRadioGroup`, see the documentation for that component.

```html
<script>
export default {
  data() {
    return {
      selected: 'yes',
    };
  },
};
</script>

<template>
  <div>
    <gl-form-radio v-model="selected" value="yes">Yes</gl-form-radio>
    <gl-form-radio v-model="selected" value="no">No</gl-form-radio>
  </div>
</template>
```
