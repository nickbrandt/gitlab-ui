import { mount, shallowMount } from '@vue/test-utils';
import { GlButton } from '../../../../../index';
import { tabsButtonDefaults } from '../../../../utils/constants';
import Tabs from './tabs.vue';

const getActionButtonProp = ({ type, text = `${type} action!` }) => ({
  [`action${type}`]: {
    text,
  },
});

describe('tabs component', () => {
  let wrapper;

  const buildTabs = (props = {}, mountFn = shallowMount, options = {}) => {
    wrapper = mountFn(Tabs, {
      propsData: {
        ...props,
      },
      ...options,
    });
  };

  const findNav = () => wrapper.find('.gl-tabs-nav');
  const findContent = () => wrapper.find('.gl-tab-content');

  describe('default', () => {
    it('should have a default theme of indigo', () => {
      buildTabs();
      expect(wrapper.attributes('activenavitemclass')).toContain('gl-tab-nav-item-active-indigo');
    });
  });

  describe('nav', () => {
    it('should have class "gl-tabs-nav"', () => {
      buildTabs({}, mount);
      expect(findNav().exists()).toBe(true);
    });

    it.each`
      type        | navClass
      ${'string'} | ${'my-nav-class my-nav-class-2'}
      ${'array'}  | ${['my-nav-class', 'my-nav-class-2']}
      ${'object'} | ${{ 'my-nav-class': true, 'my-nav-class-2': true }}
    `('should have custom $type classes', ({ navClass }) => {
      buildTabs({ navClass }, mount);

      expect(findNav().classes('my-nav-class')).toBe(true);
      expect(findNav().classes('my-nav-class-2')).toBe(true);
    });
  });

  describe('content', () => {
    it('should have class "gl-tab-content"', () => {
      buildTabs({}, mount);
      expect(findContent().exists()).toBe(true);
    });

    it.each`
      type        | contentClass
      ${'string'} | ${'my-class my-class-2'}
      ${'array'}  | ${['my-class', 'my-class-2']}
      ${'object'} | ${{ 'my-class': true, 'my-class-2': true }}
    `('should have custom $type classes', ({ contentClass }) => {
      buildTabs({ contentClass }, mount);

      expect(findContent().classes('my-class')).toBe(true);
      expect(findContent().classes('my-class-2')).toBe(true);
    });
  });

  describe('actions buttons', () => {
    describe('when no actions are provided', () => {
      it('does not render the actions tabs', () => {
        buildTabs({}, mount);

        expect(wrapper.find('[data-testid="actions-tabs-start"').exists()).toBe(false);
        expect(wrapper.find('[data-testid="actions-tabs-end"').exists()).toBe(false);
      });

      it('renders BV tabs slots', async () => {
        buildTabs({}, mount, {
          slots: {
            'tabs-start': `<div class="tabs-start-slot"></div>`,
            'tabs-end': `<div class="tabs-end-slot"></div>`,
          },
        });

        expect(wrapper.find('.tabs-start-slot').exists()).toBe(true);
        expect(wrapper.find('.tabs-end-slot').exists()).toBe(true);
      });
    });

    describe('when the actions are provided', () => {
      describe.each`
        buttonType
        ${'Primary'}
        ${'Secondary'}
        ${'Tertiary'}
      `('renders the $buttonType action buttons', ({ buttonType }) => {
        beforeEach(() => {
          const props = getActionButtonProp({ type: buttonType });
          buildTabs(props, mount);
        });

        it('renders two of a kind', () => {
          expect(wrapper.findAllComponents(GlButton)).toHaveLength(2);
        });

        it('passes the correct defaults attributes', () => {
          const testId = `action-${buttonType.toLowerCase()}`;

          expect(wrapper.find(`[data-testid="${testId}"]`).exists()).toBe(true);
          expect(wrapper.find(`[data-testid="${testId}"]`).props()).toMatchObject(
            tabsButtonDefaults[`action${buttonType}`]
          );
        });
      });

      it('correctly passes the props to the button', () => {
        buildTabs(
          {
            actionPrimary: {
              text: 'A button!',
              attributes: {
                variant: 'success',
                category: 'primary',
              },
            },
          },
          mount
        );

        expect(wrapper.findComponent(GlButton).props()).toMatchObject({
          variant: 'success',
          category: 'primary',
        });
      });

      it.each`
        buttonType
        ${'Primary'}
        ${'Secondary'}
        ${'Tertiary'}
      `('emits the $buttonType event when clicked', async ({ buttonType }) => {
        const testId = `action-${buttonType.toLowerCase()}`;
        const props = getActionButtonProp({ type: buttonType });

        buildTabs(props, mount);
        wrapper.find(`[data-testid="${testId}"]`).vm.$emit('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted(`${buttonType.toLowerCase()}`).length).toBe(1);
      });

      it('only renders action buttons', () => {
        buildTabs(
          {
            actionPrimary: {
              text: 'Primary action!',
            },
          },
          mount,
          {
            slots: {
              'tabs-start': `<div class="tabs-start-slot"></div>`,
              'tabs-end': `<div class="tabs-end-slot"></div>`,
            },
          }
        );

        expect(wrapper.find('.tabs-start-slot').exists()).toBe(false);
        expect(wrapper.find('.tabs-end-slot').exists()).toBe(false);
      });
    });
  });
});
