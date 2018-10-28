<script>
import exampleDisplay from './example_display.vue';
import * as Documentation from '../components/documentation';

export default {
  components: {
    exampleDisplay,
  },
  props: {
    componentName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedExampleId: '',
    };
  },
  computed: {
    exampleGroups() {
      for (let component in Documentation) {
        if (component.indexOf(this.componentName) > -1) {
          return Documentation[component].examples;
        }
      }
      return [];
    },
    firstExampleId() {
      if (this.exampleGroups) {
        if (this.exampleGroups.length > 0 && this.exampleGroups[0].examples.length > 0) {
          return this.exampleGroups[0].examples[0].id;
        }
      }
    },
  },
  mounted() {
    if (this.firstExampleId) this.selectedExampleId = this.firstExampleId;
  },
};
</script>

<template>
  <div v-if="exampleGroups && exampleGroups.length>0">
    <b-form-select v-model="selectedExampleId" class="mb-3">
      <template v-for="exampleGroup in exampleGroups">
        <optgroup :key="exampleGroup.title" :label="exampleGroup.name" />
        <template v-for="example in exampleGroup.examples">
          <option :value="example.id" :key="example.id">{{ example.name }}</option>
        </template>
      </template>
    </b-form-select>

    <example-display :example-name="selectedExampleId" />
  </div>
</template>
