<script>
import Pikaday from 'pikaday';
import GlFormInput from '../form/form_input/form_input.vue';
import GlIcon from '../icon/icon.vue';
import { defaultDateFormat } from '../../../utils/constants';

export const pad = (val, len = 2) => `0${val}`.slice(-len);

/**
 * Used `onSelect` method in pickaday
 * @param {Date} date UTC format
 * @return {String} Date formated in yyyy-mm-dd
 */
export const defaultDateFormatter = date => {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const equals = (date1, date2) => date1 && date2 && date1.getTime() === date2.getTime();
const isBefore = (compareTo, date) => compareTo && date && date.getTime() < compareTo.getTime();

const highlightPastDates = pikaday => {
  const pikaButtons = pikaday.el.querySelectorAll('.pika-button');
  const today = new Date();

  pikaButtons.forEach(pikaButton => {
    const { pikaYear, pikaMonth, pikaDay } = pikaButton.dataset;
    const pikaButtonDate = new Date(pikaYear, pikaMonth, pikaDay);

    if (isBefore(today, pikaButtonDate)) {
      pikaButton.classList.add('is-past-date');
    }
  });
};

export default {
  components: {
    GlFormInput,
    GlIcon,
  },
  props: {
    target: {
      type: String,
      required: false,
      default: '',
    },
    container: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: Date,
      required: false,
      default: null,
    },
    minDate: {
      type: Date,
      required: false,
      default: null,
    },
    maxDate: {
      type: Date,
      required: false,
      default: null,
    },
    startRange: {
      type: Date,
      required: false,
      default: null,
    },
    endRange: {
      type: Date,
      required: false,
      default: null,
    },
    disableDayFn: {
      type: Function,
      required: false,
      default: null,
    },
    firstDay: {
      type: Number,
      required: false,
      default: 0,
    },
    arialLabel: {
      type: String,
      required: false,
      default: '',
    },
    displayField: {
      type: Boolean,
      required: false,
      default: true,
    },
    startOpened: {
      type: Boolean,
      required: false,
      default: false,
    },
    i18n: {
      type: Object,
      required: false,
      default: null,
    },
    theme: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      format: defaultDateFormat,
    };
  },
  computed: {
    formattedDate() {
      return this.calendar && this.calendar.toString();
    },
  },
  watch: {
    value(val) {
      if (!equals(val, this.calendar.getDate())) {
        this.calendar.setDate(val, true);
      }
    },
    minDate(minDate) {
      this.calendar.setMinDate(minDate);
    },
    maxDate(maxDate) {
      this.calendar.setMaxDate(maxDate);
    },
    startRange(startRange) {
      this.calendar.setStartRange(startRange);
    },
    endRange(endRange) {
      this.calendar.setEndRange(endRange);
    },
  },
  mounted() {
    const $parentEl = this.$parent.$el;
    const trigger = this.target
      ? $parentEl.querySelector(this.target)
      : this.$refs.calendarTriggerBtn;
    const container = this.container ? $parentEl.querySelector(this.container) : this.$el;
    const drawEvent = this.draw.bind(this);

    const pikadayConfig = {
      field: this.$refs.datepickerField.$el,
      trigger,
      container,
      theme: `gl-datepicker-theme ${this.theme}`,
      defaultDate: this.value,
      setDefaultDate: Boolean(this.value),
      minDate: this.minDate,
      maxDate: this.maxDate,
      // Only supports default gitlab format YYYY-MM-DD. We have to decide if we want to support other formats.
      format: this.format,
      disableDayFn: this.disableDayFn,
      firstDay: this.firstDay,
      arialLabel: this.ariaLabel,
      toString: date => defaultDateFormatter(date),
      onSelect: this.selected.bind(this),
      onClose: this.closed.bind(this),
      onOpen: this.opened.bind(this),
      onDraw: pikaday => {
        highlightPastDates(pikaday);
        drawEvent();
      },
    };

    if (this.i18n) {
      pikadayConfig.i18n = this.i18n;
    }

    this.calendar = new Pikaday(pikadayConfig);

    if (this.startOpened) {
      this.calendar.show();
    }
  },
  beforeDestroy() {
    this.calendar.destroy();
  },
  methods: {
    selected(date) {
      this.$emit('input', date);
    },
    closed() {
      this.$emit('close');
    },
    opened() {
      this.$emit('open');
    },
    draw() {
      this.$emit('monthChange');
    },
  },
};
</script>

<template>
  <div class="gl-datepicker d-inline-block">
    <div :class="['position-relative', { 'd-none': target }]">
      <gl-form-input
        ref="datepickerField"
        class="gl-datepicker-input"
        :value="formattedDate"
        :placeholder="format"
      />
      <span ref="calendarTriggerBtn" class="gl-datepicker-trigger">
        <gl-icon name="calendar" :size="16" />
      </span>
    </div>
  </div>
</template>
