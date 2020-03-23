import { mount } from '@vue/test-utils';
import GlFormRadio from '../../../../src/components/base/form/form_radio/form_radio.vue';

describe('GlFormRadio', () => {
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
      components: { GlFormRadio },
      template: `
        <div>
          <gl-form-radio
            v-for="option in options"
            :key="option.value"
            v-model="selected"
            :value="option.value"
          >{{ option.text }}</gl-form-radio>
        </div>
      `,
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

    it('emits an input event, but not a change event on each radio', () => {
      wrapper.findAll(GlFormRadio).wrappers.forEach(radio => {
        expect(radio.emitted()).toEqual({
          input: [['two']],
        });
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

    it('emits an input event on each radio, and a change event on the newly selected radio', () => {
      const [formRadioOne, formRadioTwo] = wrapper.findAll(GlFormRadio).wrappers;

      expect(formRadioOne.emitted()).toEqual({
        input: [['two']],
      });

      expect(formRadioTwo.emitted()).toEqual({
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
