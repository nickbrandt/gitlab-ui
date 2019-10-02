<script>
import GlDatepicker from '../datepicker/datepicker.vue';

export default {
  components: {
    GlDatepicker,
  },
  props: {
    fromLabel: {
      type: String,
      required: false,
      default: 'From',
    },
    toLabel: {
      type: String,
      required: false,
      default: 'To',
    },
    value: {
      type: Object,
      required: false,
      default: null,
    },
    i18n: {
      type: Object,
      required: false,
      default: null,
    },
    defaultMinDate: {
      type: Date,
      required: false,
      default: null,
    },
    defaultMaxDate: {
      type: Date,
      required: false,
      default: null,
    },
    defaultStartDate: {
      type: Date,
      required: false,
      default: null,
    },
    defaultEndDate: {
      type: Date,
      required: false,
      default: null,
    },
    startPickerClass: {
      type: String,
      required: false,
      default: '',
    },
    endPickerClass: {
      type: String,
      required: false,
      default: '',
    },
    theme: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      fromCalendarStartRange: this.defaultStartDate,
      fromCalendarEndRange: this.defaultEndDate,
      toCalendarStartRange: this.defaultStartDate,
      toCalendarEndRange: this.defaultEndDate,
      fromCalendarMaxDate: this.defaultMaxDate,
      toCalendarMinDate: this.defaultMinDate,
      startDate: this.defaultStartDate,
      endDate: this.defaultEndDate,
    };
  },
  watch: {
    value(val) {
      const { startDate, endDate } = val;
      this.startDate = startDate;
      this.endDate = endDate;
    },
  },
  methods: {
    onStartDateSelected(startDate) {
      this.startDate = startDate;
      this.fromCalendarStartRange = startDate;
      this.toCalendarStartRange = startDate;
      this.toCalendarMinDate = startDate;

      this.$emit('input', { startDate, endDate: this.endDate });
    },
    onEndDateSelected(endDate) {
      this.endDate = endDate;
      this.fromCalendarEndRange = endDate;
      this.fromCalendarMaxDate = endDate;
      this.toCalendarEndRange = endDate;

      this.$emit('input', { startDate: this.startDate, endDate });
    },
  },
};
</script>

<template>
  <div class="gl-daterange-picker">
    <div :class="startPickerClass">
      <label>{{ fromLabel }}</label>
      <gl-datepicker
        v-model="startDate"
        :min-date="defaultMinDate"
        :max-date="fromCalendarMaxDate"
        :start-range="fromCalendarStartRange"
        :end-range="fromCalendarEndRange"
        :theme="theme"
        :i18n="i18n"
        @input="onStartDateSelected"
      />
    </div>
    <div :class="endPickerClass">
      <label>{{ toLabel }}</label>
      <gl-datepicker
        v-model="endDate"
        :min-date="toCalendarMinDate"
        :max-date="defaultMaxDate"
        :start-range="toCalendarStartRange"
        :end-range="toCalendarEndRange"
        :theme="theme"
        :i18n="i18n"
        @input="onEndDateSelected"
      />
    </div>
  </div>
</template>
