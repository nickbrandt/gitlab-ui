import { shallowMount } from '@vue/test-utils';
import DaterangePicker from '../../../components/base/daterange_picker/daterange_picker.vue';
import Datepicker from '../../../components/base/datepicker/datepicker.vue';

describe('Daterange Picker', () => {
  let wrapper;

  const factory = (options = {}) => {
    wrapper = shallowMount(DaterangePicker, {
      ...options,
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

  describe('when the start picker emits the input event', () => {
    const startDate = new Date();
    const attributes = [
      'startDate',
      'fromCalendarStartRange',
      'toCalendarStartRange',
      'toCalendarMinDate',
    ];

    beforeEach(() => {
      factory();
      findStartPicker().vm.$emit('input', startDate);
    });

    it.each(attributes)(`updates %s correctly`, attribute => {
      expect(wrapper.vm[attribute]).toBe(startDate);
    });

    it('emits the "input" event', () => {
      expect(wrapper.emittedByOrder()).toEqual([
        {
          name: 'input',
          args: [{ startDate, endDate: wrapper.vm.endDate }],
        },
      ]);
    });
  });

  describe('when the end picker emits the input event', () => {
    const endDate = new Date();
    const attributes = [
      'endDate',
      'fromCalendarEndRange',
      'fromCalendarMaxDate',
      'toCalendarEndRange',
    ];

    beforeEach(() => {
      factory();
      findEndPicker().vm.$emit('input', endDate);
    });

    it.each(attributes)(`updates %s correctly`, attribute => {
      expect(wrapper.vm[attribute]).toBe(endDate);
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
