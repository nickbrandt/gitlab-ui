import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { keyboard } from '../../../utils/constants';

import GlToken from '../token/token.vue';
import GlTokenContainer from './token_container.vue';

describe('GlTokenContainer', () => {
  const tokens = [
    {
      id: 1,
      name: 'Vue.js',
    },
    {
      id: 2,
      name: 'Ruby On Rails',
    },
    {
      id: 3,
      name: 'GraphQL',
    },
    {
      id: 4,
      name: 'Redis',
    },
  ];
  const mockedRegisterFocusOnToken = jest.fn();
  const defaultProps = { tokens, registerFocusOnToken: mockedRegisterFocusOnToken };

  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(GlTokenContainer, {
      ...options,
      propsData: {
        ...defaultProps,
        ...(options?.propsData || {}),
      },
    });
  };

  const fireKeyboardEvent = key => {
    const event = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(event);
  };

  const findTokenByName = name => {
    const tokenWrappers = wrapper.findAll(GlToken);
    return tokenWrappers.wrappers.find(tokenWrapper => tokenWrapper.text() === name);
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  describe('props', () => {
    describe('tokens', () => {
      it('renders passed tokens', () => {
        createComponent();

        expect(wrapper.findAll(GlToken).length).toBe(4);
      });
    });

    describe('registerFocusOnToken', () => {
      it('calls passed method', () => {
        createComponent();

        expect(mockedRegisterFocusOnToken).toHaveBeenCalled();
      });
    });
  });

  describe('slots', () => {
    it('renders `token-content` slot', () => {
      createComponent({
        scopedSlots: {
          'token-content': '<span>Token id: {{ props.token.id }}</span>',
        },
      });

      const tokenWrappers = wrapper.findAll(GlToken);

      expect(
        tokenWrappers.wrappers.every(
          (tokenWrapper, index) => `Token id: ${tokens[index].id}` === tokenWrapper.text()
        )
      ).toBe(true);
    });

    it('renders `text-input` slot', () => {
      createComponent({
        slots: {
          'text-input': '<input id="custom-text-input" type="text" />',
        },
      });

      expect(wrapper.find('#custom-text-input').exists()).toBe(true);
    });
  });

  describe('closing tokens', () => {
    beforeEach(() => {
      createComponent({
        data() {
          return {
            focusedTokenIndex: 0,
          };
        },
      });

      const firstToken = wrapper.find(GlToken);
      firstToken.vm.$emit('close');
    });

    it('fires `token-remove` event', () => {
      expect(wrapper.emitted('token-remove')[0]).toEqual([tokens[0]]);
    });

    it('cancels token focus', () => {
      wrapper.findAll(GlToken).wrappers.forEach(tokenWrapper => {
        expect(tokenWrapper.classes()).not.toContain('focused');
      });
    });
  });

  describe('keyboard navigation', () => {
    const setup = async (focusedTokenIndex, key) => {
      wrapper.setData({ focusedTokenIndex });

      await nextTick();

      fireKeyboardEvent(key);
    };

    describe('when escape key is pressed', () => {
      beforeEach(async () => {
        createComponent();

        await setup(0, keyboard.escape);
      });

      it('cancels token focus', () => {
        wrapper.findAll(GlToken).wrappers.forEach(tokenWrapper => {
          expect(tokenWrapper.classes()).not.toContain('focused');
        });
      });

      it('fires `cancel-focus` event', () => {
        expect(wrapper.emitted('cancel-focus')).toBeTruthy();
      });
    });

    describe('when backspace/delete key is pressed', () => {
      const tokenIndex = 2;

      beforeEach(async () => {
        createComponent();

        await setup(tokenIndex, keyboard.backspace);
      });

      it('fires `token-remove` event', () => {
        expect(wrapper.emitted('token-remove')[0]).toEqual([tokens[tokenIndex]]);
      });

      it('focuses on previous token after removing', () => {
        const expectedFocusedToken = findTokenByName(tokens[tokenIndex - 1].name);

        expect(expectedFocusedToken.classes()).toContain('focused');
      });
    });

    describe('arrow keys', () => {
      beforeEach(() => {
        createComponent();
      });

      describe('when left arrow is pressed', () => {
        it.each`
          focusedTokenIndex | expectedFocusedTokenIndex | testName
          ${3}              | ${2}                      | ${'focuses on previous token'}
          ${0}              | ${3}                      | ${'focuses on last token if there is no previous token'}
        `('$testName', async ({ focusedTokenIndex, expectedFocusedTokenIndex }) => {
          await setup(focusedTokenIndex, keyboard.arrowLeft);

          const expectedFocusedToken = findTokenByName(tokens[expectedFocusedTokenIndex].name);
          expect(expectedFocusedToken.classes()).toContain('focused');
        });
      });

      describe('when right arrow is pressed', () => {
        it.each`
          focusedTokenIndex | expectedFocusedTokenIndex | testName
          ${0}              | ${1}                      | ${'focuses on next token'}
          ${3}              | ${0}                      | ${'focuses on first token if there is no next token'}
        `('$testName', async ({ focusedTokenIndex, expectedFocusedTokenIndex }) => {
          await setup(focusedTokenIndex, keyboard.arrowRight);

          const expectedFocusedToken = findTokenByName(tokens[expectedFocusedTokenIndex].name);
          expect(expectedFocusedToken.classes()).toContain('focused');
        });
      });

      it('focuses on the first token when home key is pressed', async () => {
        await setup(3, keyboard.home);

        const expectedFocusedToken = findTokenByName(tokens[0].name);
        expect(expectedFocusedToken.classes()).toContain('focused');
      });

      it('focuses on the last token when end key is pressed', async () => {
        await setup(0, keyboard.end);

        const expectedFocusedToken = findTokenByName(tokens[3].name);
        expect(expectedFocusedToken.classes()).toContain('focused');
      });
    });
  });

  it('cancels token focus when click is outside of token', async () => {
    const div = document.createElement('div');
    const button = document.createElement('button');
    div.appendChild(button);
    document.body.appendChild(div);

    createComponent({
      attachTo: div,
    });

    wrapper.setData({ focusedTokenIndex: 0 });

    await nextTick();

    button.click();

    await nextTick();

    wrapper.findAll(GlToken).wrappers.forEach(tokenWrapper => {
      expect(tokenWrapper.classes()).not.toContain('focused');
    });
  });
});
