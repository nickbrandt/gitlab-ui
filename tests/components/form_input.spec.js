import { mount } from '@vue/test-utils';
import BFormInput from 'bootstrap-vue/src/components/form-input/form-input';
import FormInput from '../../components/base/form/form_input/form_input.vue';
import Button from '../../components/base/button/button.vue';

describe('form input component', () => {
  let wrapper;

  describe('when clearable', () => {
    const userInput = 'test';

    describe('when userInput is present', () => {
      beforeEach(() => {
        wrapper = mount(FormInput, {
          propsData: { clearable: true },
          data() {
            return {
              userInput,
            }
          }
        });
      });
  
      it('has a <gl-button />', () => {
        expect(wrapper.find(Button).exists()).toBe(true);
      });

      it('clears input on click', () => {
        expect(wrapper.find(BFormInput).element.value).toEqual(userInput);

        wrapper.find(Button).trigger('click');

        expect(wrapper.find(BFormInput).element.value).toEqual('');
      });

      it('focuses on the input after click', () => {
        wrapper.find(Button).trigger('click');

        expect(wrapper.find(BFormInput).element).toEqual(document.activeElement);
      });
    });

    describe('when userInput is NOT present', () => {
      beforeEach(() => {
        wrapper = mount(FormInput, { props: { clearable: true }});
      });
  
      it('does not find <gl-button />', () => {
        expect(wrapper.find(Button).exists()).toBe(false);
      });
    });
  });

  describe('when clearable is false', () => {
    beforeEach(() => {
      wrapper = mount(FormInput);
    });

    it('does not find <gl-button />', () => {
      expect(wrapper.find(Button).exists()).toBe(false);
    });
  });
});
