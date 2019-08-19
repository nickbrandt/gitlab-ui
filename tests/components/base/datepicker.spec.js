import Pikaday from 'pikaday';
import { shallowMount } from '@vue/test-utils';
import GlDatepicker from '../../../components/base/datepicker/datepicker.vue';

jest.mock('pikaday');

describe('datepicker component', () => {
  const mountWithOptions = shallowMount.bind(null, GlDatepicker);
  let currentDate;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const DateConstructor = Date;

    currentDate = new Date(2018, 0, 1);

    global.Date = jest.fn(
      (...dateParams) => (dateParams.length ? new DateConstructor(...dateParams) : currentDate)
    );
  });

  it('sets initial value as the calendar default date', () => {
    mountWithOptions({
      propsData: {
        value: currentDate,
      },
    });

    expect(Pikaday).toHaveBeenCalled();
    expect(Pikaday.mock.calls[0][0]).toMatchObject({
      defaultDate: currentDate,
      setDefaultDate: true,
    });
  });

  it('opens calendar after mounting when start-opened property equals true', () => {
    mountWithOptions({ propsData: { startOpened: true } });

    expect(Pikaday.prototype.show).toHaveBeenCalled();
  });

  it('hides field when custom target is provided', () => {
    const wrapper = mountWithOptions({ propsData: { target: 'body' } });

    expect(wrapper.find('.d-none').exists()).toBe(true);
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

      const config = Pikaday.mock.calls[0][0];

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
    ({ calendarSetter, componentProperty, extraParams }) => {
      const wrapper = mountWithOptions();

      wrapper.setProps({ [componentProperty]: currentDate });
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

      const config = Pikaday.mock.calls[0][0];

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
