import { shallowMount } from '@vue/test-utils';
import DaterangePicker from '../../../src/components/base/daterange_picker/daterange_picker.vue';
import Datepicker from '../../../src/components/base/datepicker/datepicker.vue';

describe('Daterange Picker', () => {
  let wrapper;

  const startDate = new Date('2020-08-27');
  const endDate = new Date('2020-08-29');

  const factory = (props = {}) => {
    wrapper = shallowMount(DaterangePicker, {
      propsData: {
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        ...props,
      },
    });
  };

  const findStartPicker = () => wrapper.findAll(Datepicker).at(0);
  const findEndPicker = () => wrapper.findAll(Datepicker).at(1);

  afterEach(() => {
    wrapper.destroy();
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

      it('sets the toCalendarMinDate to one day after the startDate', () => {
        const toCalendarMinDate = new Date('2020-08-28');

        expect(wrapper.vm.toCalendarMinDate).toEqual(toCalendarMinDate);
      });

      describe('with a date range violation', () => {
        beforeEach(() => {
          factory({
            defaultEndDate: new Date('2020-08-26'),
          });
          findStartPicker().vm.$emit('input', startDate);
        });

        it('does not emit the "input" event when there is a date range violation', () => {
          expect(wrapper.emittedByOrder()).toEqual([]);
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
          expect(wrapper.emittedByOrder()).toEqual([
            {
              name: 'input',
              args: [{ startDate, endDate: wrapper.vm.endDate }],
            },
          ]);
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
        expect(wrapper.emittedByOrder()).toEqual([
          {
            name: 'input',
            args: [{ startDate: wrapper.vm.startDate, endDate }],
          },
        ]);
      });
    });
  });
});
