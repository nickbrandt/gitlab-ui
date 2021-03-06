import { mount } from '@vue/test-utils';

import GlToken from '../token/token.vue';
import GlTokenContainer from './token_container.vue';
import { keyboard } from '~/utils/constants';

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

  const createComponent = (options) => {
    wrapper = mount(GlTokenContainer, {
      ...options,
      propsData: {
        ...defaultProps,
        ...(options?.propsData || {}),
      },
      attachTo: document.body,
    });
  };

  const findTokenByName = (name) => {
    const tokenWrappers = wrapper.findAllComponents({ ref: 'tokens' });

    return tokenWrappers.wrappers.find((tokenWrapper) => tokenWrapper.text() === name);
  };

  const findTokenContainer = () => wrapper.find({ ref: 'tokenContainer' });

  const blurActiveElement = () => document.activeElement?.blur?.();

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
    blurActiveElement();
  });

  describe('props', () => {
    describe('tokens', () => {
      it('renders passed tokens', () => {
        createComponent();

        expect(wrapper.findAllComponents(GlToken).length).toBe(4);
      });
    });

    describe('state', () => {
      describe('when `state` is `false`', () => {
        it('adds `aria-invalid="true"` attribute`', () => {
          createComponent({
            propsData: {
              state: false,
            },
          });

          expect(findTokenContainer().attributes('aria-invalid')).toBe('true');
        });
      });

      describe.each`
        value
        ${true}
        ${null}
      `('when `state` is `$value`', ({ value }) => {
        it('does not add `aria-invalid` attribute', () => {
          createComponent({
            propsData: {
              state: value,
            },
          });

          expect(findTokenContainer().attributes('aria-invalid')).toBeUndefined();
        });
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

      const tokenWrappers = wrapper.findAllComponents(GlToken);

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

      const firstToken = wrapper.findComponent(GlToken);
      firstToken.vm.$emit('close');
    });

    it('fires `token-remove` event', () => {
      expect(wrapper.emitted('token-remove')[0]).toEqual([tokens[0]]);
    });

    it('cancels token focus', () => {
      wrapper.findAllComponents({ ref: 'tokens' }).wrappers.forEach((tokenWrapper) => {
        expect(tokenWrapper.element).not.toHaveFocus();
      });
    });
  });

  describe('keyboard navigation', () => {
    const setup = async (focusedTokenIndex, key) => {
      createComponent(
        {
          data() {
            return { focusedTokenIndex };
          },
        },
        true
      );

      const focusedToken = findTokenByName(tokens[focusedTokenIndex].name);

      await focusedToken.trigger('keydown', { key });
    };

    describe('when escape key is pressed', () => {
      it('fires `cancel-focus` event', async () => {
        await setup(0, keyboard.escape);

        expect(wrapper.emitted('cancel-focus')).toBeTruthy();
      });
    });

    describe('when backspace/delete key is pressed', () => {
      const tokenIndex = 2;

      beforeEach(async () => {
        await setup(tokenIndex, keyboard.backspace);
      });

      it('fires `token-remove` event', () => {
        expect(wrapper.emitted('token-remove')[0]).toEqual([tokens[tokenIndex]]);
      });

      it('focuses on previous token after removing', () => {
        const expectedFocusedToken = findTokenByName(tokens[tokenIndex - 1].name);

        expect(expectedFocusedToken.element).toHaveFocus();
      });
    });

    describe('arrow keys', () => {
      describe('when left arrow is pressed', () => {
        it.each`
          focusedTokenIndex | expectedFocusedTokenIndex | testName
          ${3}              | ${2}                      | ${'focuses on previous token'}
          ${0}              | ${3}                      | ${'focuses on last token if there is no previous token'}
        `('$testName', async ({ focusedTokenIndex, expectedFocusedTokenIndex }) => {
          await setup(focusedTokenIndex, keyboard.arrowLeft);

          const expectedFocusedToken = findTokenByName(tokens[expectedFocusedTokenIndex].name);
          expect(expectedFocusedToken.element).toHaveFocus();
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
          expect(expectedFocusedToken.element).toHaveFocus();
        });
      });

      it('focuses on the first token when home key is pressed', async () => {
        await setup(3, keyboard.home);

        const expectedFocusedToken = findTokenByName(tokens[0].name);
        expect(expectedFocusedToken.element).toHaveFocus();
      });

      it('focuses on the last token when end key is pressed', async () => {
        await setup(0, keyboard.end);

        const expectedFocusedToken = findTokenByName(tokens[3].name);
        expect(expectedFocusedToken.element).toHaveFocus();
      });

      it('keeps track of focused token when token is focused by click/tap', async () => {
        createComponent({});

        const focusedToken = findTokenByName(tokens[3].name);

        await focusedToken.trigger('focus');
        await focusedToken.trigger('keydown', { key: keyboard.arrowLeft });

        const expectedFocusedToken = findTokenByName(tokens[2].name);
        expect(expectedFocusedToken.element).toHaveFocus();
      });
    });
  });
});
