import { shallowMount } from '@vue/test-utils';
import Datepicker from '../datepicker/datepicker.vue';
import DaterangePicker from './daterange_picker.vue';

describe('Daterange Picker', () => {
  let wrapper;

  const startDate = new Date('2020-08-27');
  const endDate = new Date('2020-08-29');
  const defaultMaxDate = new Date('2021-01-01');

  const factory = (props = {}) => {
    wrapper = shallowMount(DaterangePicker, {
      propsData: {
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        ...props,
      },
    });
  };

  const findStartPicker = () => wrapper.findAllComponents(Datepicker).at(0);
  const findEndPicker = () => wrapper.findAllComponents(Datepicker).at(1);

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('renders two datepickers', () => {
    factory();
    expect(findStartPicker().exists()).toBe(true);
    expect(findEndPicker().exists()).toBe(true);
  });

  describe('from date picker', () => {
    describe('emits the input event', () => {
      beforeEach(() => {
        factory();
        findStartPicker().vm.$emit('input', startDate);
      });

      it('updates startDate correctly', () => {
        expect(wrapper.vm.startDate).toBe(startDate);
      });

      it("sets the end date picker's minDate to one day after the startDate", () => {
        const toCalendarMinDate = new Date('2020-08-28');

        expect(findEndPicker().props('minDate')).toEqual(toCalendarMinDate);
      });

      it('emits `start-date-open` event on component when `open` event fires', () => {
        findStartPicker().vm.$emit('open');

        expect(wrapper.emitted('start-picker-open')).toBeTruthy();
      });

      it('emits `start-date-close` event on component when `close` event fires', () => {
        findStartPicker().vm.$emit('close');

        expect(wrapper.emitted('start-picker-close')).toBeTruthy();
      });

      describe('with a date range violation', () => {
        beforeEach(() => {
          factory({
            defaultEndDate: new Date('2020-08-26'),
          });
          findStartPicker().vm.$emit('input', startDate);
        });

        it('does not emit the "input" event when there is a date range violation', () => {
          expect(Object.keys(wrapper.emitted())).toHaveLength(0);
        });

        it('sets openToCalendar=true', () => {
          expect(wrapper.vm.openToCalendar).toBe(true);
        });

        it('sets endDate=null', () => {
          expect(wrapper.vm.endDate).toBe(null);
        });
      });

      describe('with no date range violation', () => {
        it('emits the "input" event', () => {
          expect(wrapper.emitted('input')).toEqual([[{ startDate, endDate: wrapper.vm.endDate }]]);
        });
      });
    });
  });

  describe('end date picker', () => {
    describe('emits the input event', () => {
      beforeEach(() => {
        factory();
        findEndPicker().vm.$emit('input', endDate);
      });

      it('updates endDate correctly', () => {
        expect(wrapper.vm.endDate).toBe(endDate);
      });

      it('sets openToCalendar=false', () => {
        expect(wrapper.vm.openToCalendar).toBe(false);
      });

      it('calls the event handler', () => {
        expect(wrapper.emitted('input')).toEqual([[{ startDate: wrapper.vm.startDate, endDate }]]);
      });

      it('emits `end-date-open` event on component when `open` event fires', () => {
        findEndPicker().vm.$emit('open');

        expect(wrapper.emitted('end-picker-open')).toBeTruthy();
      });

      it('emits `end-date-close` event on component when `close` event fires', () => {
        findEndPicker().vm.$emit('close');

        expect(wrapper.emitted('end-picker-close')).toBeTruthy();
      });
    });
  });

  describe('with maxDateRange = 10', () => {
    beforeEach(() => {
      factory({ maxDateRange: 10, defaultMaxDate });
    });

    it('sets the maxDate to the startDate + the maxDateRange', () => {
      const maxDate = new Date('2020-09-06');

      expect(findEndPicker().props('maxDate')).toEqual(maxDate);
    });
  });

  describe('with startPickerTarget/endPickerTarget defined', () => {
    beforeEach(() => {
      factory({ startPickerTarget: '.btn', endPickerTarget: '.btn' });
    });

    it('sets the `target` prop to startPickerTarget', () => {
      expect(findStartPicker().props('target')).toBe('.btn');
    });

    it('sets the `target` prop to endPickerTarget', () => {
      expect(findEndPicker().props('target')).toBe('.btn');
    });
  });

  describe('with startPickerContainer/endPickerContainer defined', () => {
    beforeEach(() => {
      factory({ startPickerContainer: 'body', endPickerContainer: 'body' });
    });

    it('sets the `container` prop to startPickerContainer', () => {
      expect(findStartPicker().props('container')).toBe('body');
    });

    it('sets the `container` prop to endPickerContainer', () => {
      expect(findEndPicker().props('container')).toBe('body');
    });
  });

  describe('sameDaySelection = true', () => {
    describe('from date picker', () => {
      beforeEach(() => {
        factory({ sameDaySelection: true });
      });

      it('updates startDate correctly', () => {
        expect(wrapper.vm.startDate).toBe(startDate);
      });

      it("sets the end date picker's minDate to the startDate", () => {
        expect(findEndPicker().props('minDate')).toEqual(startDate);
      });

      describe('with maxDateRange = 10', () => {
        beforeEach(() => {
          factory({ sameDaySelection: true, maxDateRange: 10, defaultMaxDate });
        });

        it('sets the maxDate to the startDate + the maxDateRange - 1', () => {
          const maxDate = new Date('2020-09-05');

          expect(findEndPicker().props('maxDate')).toEqual(maxDate);
        });
      });
    });
  });

  describe('labelClass', () => {
    const customClass = 'foobar';

    const findLabelsWithCustomClass = () =>
      wrapper.findAll('label').filter((label) => label.classes(customClass));

    it('does not have the class by default', () => {
      factory();

      expect(findLabelsWithCustomClass()).toHaveLength(0);
    });

    it('adds the label class when provided', () => {
      factory({ labelClass: customClass });

      expect(findLabelsWithCustomClass()).toHaveLength(2);
    });
  });
});
