<script>
import GlFormSelect from '../../src/components/base/form/form_select/form_select.vue';
import { getDocumentationFor } from '../components_documentation';
import GlExampleDisplay from './example_display.vue';

export default {
  components: {
    GlExampleDisplay,
    GlFormSelect,
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
      return getDocumentationFor(this.componentName).examples || [];
    },
    firstExampleId() {
      if (
        this.exampleGroups &&
        this.exampleGroups.length > 0 &&
        this.exampleGroups[0].items &&
        this.exampleGroups[0].items.length > 0
      ) {
        return this.exampleGroups[0].items[0].id;
      }
      return null;
    },
  },
  mounted() {
    if (this.firstExampleId) {
      this.selectedExampleId = this.firstExampleId;
    }
  },
};
</script>

<template>
  <div>
    <h3>Examples</h3>
    <gl-form-select
      v-if="exampleGroups && exampleGroups.length > 0"
      v-model="selectedExampleId"
      class="mb-3"
    >
      <optgroup
        v-for="exampleGroup in exampleGroups"
        :key="exampleGroup.title"
        :label="exampleGroup.name"
      >
        <option v-for="example in exampleGroup.items" :key="example.id" :value="example.id">
          {{ example.name }}
        </option>
      </optgroup>
    </gl-form-select>
    <gl-example-display v-if="selectedExampleId" :example-name="selectedExampleId" />
  </div>
</template>
