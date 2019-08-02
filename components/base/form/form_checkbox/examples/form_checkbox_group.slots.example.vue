<template>
  <gl-form-checkbox-group>
    <gl-form-checkbox>One</gl-form-checkbox>
    <gl-form-checkbox>
      Two
      <template v-slot:help>Help text</template>
    </gl-form-checkbox>
    <gl-form-checkbox>Three</gl-form-checkbox>
  </gl-form-checkbox-group>
</template>
