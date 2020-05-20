import { nextTick } from 'vue';
import Pikaday from 'pikaday';
import { shallowMount } from '@vue/test-utils';
import GlDatepicker from './datepicker.vue';

jest.mock('pikaday');

describe('datepicker component', () => {
  const mountWithOptions = shallowMount.bind(null, GlDatepicker);
  const pikadayConfig = () => Pikaday.mock.calls[0][0];
  let currentDate;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const DateConstructor = Date;

    currentDate = new Date(2018, 0, 1);

    global.Date = jest.fn((...dateParams) =>
      dateParams.length ? new DateConstructor(...dateParams) : currentDate
    );
  });

  it('sets initial value as the calendar default date', () => {
    mountWithOptions({
      propsData: {
        value: currentDate,
      },
    });

    expect(Pikaday).toHaveBeenCalled();
    expect(pikadayConfig()).toMatchObject({
      defaultDate: currentDate,
      setDefaultDate: true,
    });
  });

  it('opens calendar after mounting when start-opened property equals true', () => {
    mountWithOptions({ propsData: { startOpened: true } });

    expect(Pikaday.prototype.show).toHaveBeenCalled();
  });

  describe('when `target` prop is not passed', () => {
    it('sets calendar icon as `trigger` option', () => {
      const wrapper = mountWithOptions();

      expect(pikadayConfig()).toMatchObject({
        trigger: wrapper.vm.$refs.calendarTriggerBtn,
      });
      return nextTick().then(() => {
        expect(wrapper.find({ ref: 'calendarTriggerBtn' }).classes()).not.toContain(
          'gl-pointer-events-none'
        );
      });
    });
  });

  describe('when `target` prop is `null`', () => {
    it('does not pass the `trigger` option to Pikaday', () => {
      // This will cause the calendar to open when the `field` is focused
      // https://github.com/Pikaday/Pikaday#configuration

      const wrapper = mountWithOptions({ propsData: { target: null } });

      expect(pikadayConfig()).not.toHaveProperty('trigger');
      return nextTick().then(() => {
        expect(wrapper.find({ ref: 'calendarTriggerBtn' }).classes()).toContain(
          'gl-pointer-events-none'
        );
      });
    });
  });

  describe('when `container` prop is not passed', () => {
    it('sets component element as `container` option', () => {
      const wrapper = mountWithOptions();

      expect(pikadayConfig()).toHaveProperty('container', wrapper.vm.$el);
    });
  });

  describe('when `container` prop is `null`', () => {
    it('does not pass the `container` option to Pikaday', () => {
      mountWithOptions({
        propsData: { container: null },
      });

      expect(pikadayConfig()).not.toHaveProperty('container');
    });
  });

  describe('when text input is passed in the default slot', () => {
    it('sets it as Pikaday `field` option', () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('name', 'foo-bar');

      mountWithOptions({
        slots: { default: input.outerHTML },
      });

      expect(pikadayConfig()).toMatchObject({
        field: input,
      });
    });
  });

  it.each`
    calendarEvent | componentEvent | params
    ${'onSelect'} | ${'input'}     | ${[currentDate]}
    ${'onClose'}  | ${'close'}     | ${[]}
    ${'onOpen'}   | ${'open'}      | ${[]}
  `(
    'emits $componentEvent event when calendar emits $calendarEvent event',
    ({ componentEvent, calendarEvent, params }) => {
      const wrapper = mountWithOptions();

      const config = pikadayConfig();

      config[calendarEvent](...params);

      expect(wrapper.emitted(componentEvent)[0]).toEqual(params);
    }
  );

  it.each`
    calendarSetter  | calendarProperty | componentProperty | extraParams
    ${'setDate'}    | ${'date'}        | ${'value'}        | ${[true]}
    ${'setMinDate'} | ${'minDate'}     | ${'minDate'}      | ${[]}
    ${'setMaxDate'} | ${'maxDate'}     | ${'maxDate'}      | ${[]}
  `(
    'sets $calendarProperty calendar property when $componentProperty component property changes',
    async ({ calendarSetter, componentProperty, extraParams }) => {
      const wrapper = mountWithOptions();

      wrapper.setProps({ [componentProperty]: currentDate });

      await wrapper.vm.$nextTick();
      expect(Pikaday.prototype[calendarSetter]).toHaveBeenCalledWith(currentDate, ...extraParams);
    }
  );

  describe('when draw event is emitted', () => {
    let pikaday;
    let pastDateButton;
    let futureDateButton;
    let wrapper;

    beforeEach(() => {
      pastDateButton = {
        dataset: {
          pikaYear: 2016,
          pikaMonth: 1,
          pikaDay: 1,
        },
        classList: {
          add: jest.fn(),
        },
      };
      futureDateButton = {
        dataset: {
          pikaYear: currentDate.getFullYear(),
          pikaMonth: currentDate.getMonth(),
          pikaDay: currentDate.getDate() + 1,
        },
        classList: {
          add: jest.fn(),
        },
      };
      pikaday = {
        el: {
          querySelectorAll() {
            return [pastDateButton, futureDateButton];
          },
        },
      };

      wrapper = mountWithOptions();

      const config = pikadayConfig();

      config.onDraw(pikaday);
    });

    it('marks past days with "is-past-date" class selector', () => {
      expect(pastDateButton.classList.add).toHaveBeenCalledWith('is-past-date');
    });

    it('does not mark future days with "is-past-date" class selector', () => {
      expect(futureDateButton.classList.add).not.toHaveBeenCalled();
    });

    it('emits monthChange event', () => {
      expect(wrapper.emitted('monthChange')).toHaveLength(1);
    });
  });
});
