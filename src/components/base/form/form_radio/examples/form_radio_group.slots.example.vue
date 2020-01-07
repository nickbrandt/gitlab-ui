<template>
  <gl-form-radio-group>
    <gl-form-radio>One</gl-form-radio>
    <gl-form-radio>
      Two
      <template v-slot:help>Help text</template>
    </gl-form-radio>
    <gl-form-radio>Three</gl-form-radio>
  </gl-form-radio-group>
</template>
