import { mount } from '@vue/test-utils';
import GlFormRadioGroup from '../../../../src/components/base/form/form_radio_group/form_radio_group.vue';

describe('GlFormRadioGroup', () => {
  let wrapper;
  let options;

  const createWrapper = () => {
    options = [
      {
        text: 'One',
        value: 'one',
      },
      {
        text: 'Two',
        value: 'two',
      },
    ];

    wrapper = mount({
      data() {
        return {
          selected: options[0].value,
          options,
        };
      },
      components: { GlFormRadioGroup },
      template: '<gl-form-radio-group v-model="selected" :options="options" />',
    });
  };

  const findRadio = value => wrapper.find(`input[type="radio"][value="${value}"]`);

  beforeEach(() => {
    createWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('checks the radio button correctly on mount', () => {
    const radio = findRadio('one');
    expect(radio.element.checked).toBe(true);
  });

  describe('when the selected value is changed programmatically', () => {
    beforeEach(() => {
      wrapper.vm.selected = 'two';
      return wrapper.vm.$nextTick();
    });

    it('emits an input event, but not a change event', () => {
      expect(wrapper.find(GlFormRadioGroup).emitted()).toEqual({
        input: [['two']],
      });
    });

    it('checks the correct radio', () => {
      expect(findRadio('two').element.checked).toBe(true);
    });
  });

  describe('when the selected value is changed by the user', () => {
    let radio;

    beforeEach(async () => {
      radio = findRadio('two');

      radio.trigger('click');
      await wrapper.vm.$nextTick();
    });

    it('emits an input event and a change event', () => {
      expect(wrapper.find(GlFormRadioGroup).emitted()).toEqual({
        input: [['two']],
        change: [['two']],
      });
    });

    it('updates the bound value', () => {
      expect(wrapper.vm.selected).toBe('two');
    });

    it('checks the radio', () => {
      expect(radio.element.checked).toBe(true);
    });
  });
});
