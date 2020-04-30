<script>
import Pikaday from 'pikaday';
import { isString } from 'lodash';
import GlFormInput from '../form/form_input/form_input.vue';
import GlIcon from '../icon/icon.vue';
import { areDatesEqual } from '../../../utils/datetime_utility';
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
    defaultDate: {
      type: Date,
      required: false,
      default: null,
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
    customTrigger() {
      return isString(this.target) && this.target !== '';
    },
    triggerOnFocus() {
      return this.target === null;
    },
    showDefaultField() {
      return !this.customTrigger || this.triggerOnFocus;
    },
  },
  watch: {
    value(val) {
      if (!areDatesEqual(val, this.calendar.getDate())) {
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
    const drawEvent = this.draw.bind(this);

    const pikadayConfig = {
      field: this.$el.querySelector('input[type="text"]'),
      // `position-absolute` is needed because of this bug: https://github.com/Pikaday/Pikaday/issues/840
      theme: `gl-datepicker-theme position-absolute ${this.theme}`,
      defaultDate: this.value || this.defaultDate,
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

    // Pass `null` as `target` prop to use the `field` as the trigger (open on focus)
    if (!this.triggerOnFocus) {
      const trigger = this.customTrigger
        ? $parentEl.querySelector(this.target)
        : this.$refs.calendarTriggerBtn;
      pikadayConfig.trigger = trigger;

      // Set `trigger` as the `field` if `field` element doesn't exist (not passed via the slot)
      if (!pikadayConfig.field && this.customTrigger) {
        pikadayConfig.field = trigger;
      }
    }

    // Pass `null` as `container` prop to prevent passing the `container` option to Pikaday
    if (this.container !== null) {
      const container = this.container ? $parentEl.querySelector(this.container) : this.$el;
      pikadayConfig.container = container;
    }

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
    <div v-if="showDefaultField" class="position-relative">
      <slot :formatted-date="formattedDate">
        <gl-form-input class="gl-datepicker-input" :value="formattedDate" :placeholder="format" />
      </slot>
      <span
        ref="calendarTriggerBtn"
        :class="['gl-datepicker-trigger', { 'gl-pointer-events-none': triggerOnFocus }]"
      >
        <gl-icon name="calendar" :size="16" />
      </span>
    </div>
    <slot v-else :formatted-date="formattedDate"> </slot>
  </div>
</template>
