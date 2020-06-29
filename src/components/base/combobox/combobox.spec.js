import { mount } from '@vue/test-utils';
import GlDropdownItem from '../new_dropdown/new_dropdown_item.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlCombobox from './combobox.vue';
import { tokenList, labelText } from './constants';

const partialToken = 'do';
const partialTokenMatch = ['dog', 'dodo', 'komodo dragon'];
const unlistedToken = 'elephant';

const doTimes = (num, fn) => {
  for (let i = 0; i < num; i += 1) {
    fn();
  }
};

describe('GlCombobox', () => {
  let wrapper;

  const createComponent = () => {
    wrapper = mount({
      data() {
        return {
          inputVal: '',
          tokens: tokenList,
          labelText,
        };
      },
      components: { GlCombobox },
      template: `
        <div>
          <gl-combobox
            v-model="inputVal"
            :token-list="tokens"
            :labelText="labelText"
          />
        </div>
      `,
    });
  };

  // needs new selector now
  const findDropdown = () => wrapper.find('[data-testid="combobox-dropdown"]');
  const findDropdownOptions = () => wrapper.findAll(GlDropdownItem).wrappers.map(item => item.text());
  const findInput = () => wrapper.find(GlFormInput);
  const findInputValue = () => findInput().element.value;
  const setInput = val => findInput().setValue(val);
  const clickDown = () => findInput().trigger('keydown.down');

  afterEach(() => {
    wrapper.destroy();
  });

  describe('match and filter functionality', () => {
    beforeEach(() => {
      createComponent();
    });

    it('is closed when the input is empty', () => {
      expect(findInput().isVisible()).toBe(true);
      expect(findInputValue()).toBe('');
      expect(findDropdown().isVisible()).toBe(false);
    });

    it('is open when the input text matches a token', async () => {
      setInput(partialToken);

      await wrapper.vm.$nextTick();
      expect(findDropdown().isVisible()).toBe(true);
    });

    it('shows partial matches at string start and mid-string', async () => {
      setInput(partialToken);

      await wrapper.vm.$nextTick();
      expect(findDropdown().isVisible()).toBe(true);
      expect(findDropdownOptions()).toEqual(partialTokenMatch);
    });

    it('is closed when the text does not match', async () => {
      setInput(unlistedToken);

      await wrapper.vm.$nextTick();
      expect(findDropdown().isVisible()).toBe(false);
    });
  });

  describe('keyboard navigation in dropdown', () => {
    beforeEach(() => {
      createComponent();
    });

    describe('on down arrow + enter', () => {
      it('selects the next item in the list and closes the dropdown', async () => {
        setInput(partialToken);

        await wrapper.vm.$nextTick();
        findInput().trigger('keydown.down');
        findInput().trigger('keydown.enter');

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialTokenMatch[0]);
      });

      it('loops to the top when it reaches the bottom', async () => {
        setInput(partialToken);

        await wrapper.vm.$nextTick();
        doTimes(findDropdownOptions().length + 1, clickDown);
        findInput().trigger('keydown.enter');

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialTokenMatch[0]);
      });
    });

    describe('on up arrow + enter', () => {
      it('selects the previous item in the list and closes the dropdown', async () => {
        setInput(partialToken);

        await wrapper.vm.$nextTick();
        doTimes(3, clickDown);
        findInput().trigger('keydown.up');
        findInput().trigger('keydown.enter');

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialTokenMatch[1]);
      });

      it('loops to the bottom when it reaches the top', async () => {
        setInput(partialToken);

        await wrapper.vm.$nextTick();
        findInput().trigger('keydown.down');
        findInput().trigger('keydown.up');
        findInput().trigger('keydown.enter');

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialTokenMatch[partialTokenMatch.length - 1]);
      });
    });

    describe('on enter with no item highlighted', () => {
      it('does not select any item and closes the dropdown', async () => {
        setInput(partialToken);

        await wrapper.vm.$nextTick();
        findInput().trigger('keydown.enter');

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialToken);
      });
    });

    describe('on click', async () => {
      it('selects the clicked item regardless of arrow highlight', async () => {
        setInput(partialToken);

        await wrapper.vm.$nextTick();
        wrapper.find('[data-testid="combobox-dropdown"] button').trigger('click');

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialTokenMatch[0]);
      });
    });

    describe('on tab', () => {
      it('selects entered text, closes dropdown', async () => {
        setInput(partialToken);

        await wrapper.vm.$nextTick();
        findInput().trigger('keydown.tab');
        doTimes(2, clickDown);

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialToken);
        expect(findDropdown().isVisible()).toBe(false);
      });
    });

    describe('on esc', () => {
      describe('when dropdown is open', () => {
        it('closes dropdown and does not select anything', async () => {
          setInput(partialToken);

          await wrapper.vm.$nextTick();
          findInput().trigger('keydown.esc');

          await wrapper.vm.$nextTick();
          expect(findInputValue()).toBe(partialToken);
          expect(findDropdown().isVisible()).toBe(false);

        });
      });

      describe('when dropdown is closed', () => {
        it('clears the input field', async () => {
          setInput(unlistedToken);

          await wrapper.vm.$nextTick();
          expect(findDropdown().isVisible()).toBe(false);
          findInput().trigger('keydown.esc');

          await wrapper.vm.$nextTick();
          expect(findInputValue()).toBe('');
        });
      });
    });
  });
});
