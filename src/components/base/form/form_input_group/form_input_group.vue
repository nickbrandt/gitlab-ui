<script>
import { BInputGroup, BInputGroupPrepend, BInputGroupAppend, BFormInput } from 'bootstrap-vue';
import GlDeprecatedDropdown from '../../deprecated_dropdown/deprecated_dropdown.vue';
import GlDeprecatedDropdownItem from '../../deprecated_dropdown/deprecated_dropdown_item.vue';
import InputGroupMixin from './form_input_group_mixin';

export default {
  name: 'GlFormInputGroup',
  components: {
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormInput,
    GlDeprecatedDropdown,
    GlDeprecatedDropdownItem,
  },
  mixins: [InputGroupMixin],
  props: {
    selectOnClick: {
      type: Boolean,
      required: false,
      default: false,
    },
    predefinedOptions: {
      type: Array,
      required: false,
      default: () => [{ value: '', name: '' }],
      validator: options => options.every(opt => Object.keys(opt).includes('name', 'value')),
    },
  },
  data() {
    return {
      activeOption: this.predefinedOptions && this.predefinedOptions[0].name,
    };
  },
  methods: {
    handleClick() {
      if (this.selectOnClick) {
        this.$refs.input.$el.select();
      }
    },
    updateValue(option) {
      const { name, value } = option;
      this.activeOption = name;
      this.localValue = value;
    },
  },
};
</script>
<template>
  <div>
    <b-input-group>
      <b-input-group-prepend v-if="activeOption || $scopedSlots.prepend">
        <slot name="prepend"></slot>
        <gl-deprecated-dropdown v-if="activeOption" :text="activeOption">
          <gl-deprecated-dropdown-item
            v-for="option in predefinedOptions"
            :key="option.value"
            :active="activeOption === option.name"
            @click="updateValue(option)"
          >
            {{ option.name }}
          </gl-deprecated-dropdown-item>
        </gl-deprecated-dropdown>
      </b-input-group-prepend>
      <slot>
        <b-form-input
          ref="input"
          v-model="localValue"
          class="gl-form-input"
          v-bind="$attrs"
          v-on="$listeners"
          @click="handleClick"
        />
      </slot>
      <b-input-group-append v-if="$scopedSlots.append">
        <slot name="append"></slot>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
