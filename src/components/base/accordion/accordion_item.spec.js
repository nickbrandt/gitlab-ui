import { mount } from '@vue/test-utils';
import { BCollapse } from 'bootstrap-vue';
import GlAccordionItem from './accordion_item.vue';
import GlButton from '../button/button.vue';
import GlCollapseToggleDirective from '../../../directives/collapse_toggle';

describe('GlAccordionItem', () => {
  let wrapper;
  const defaultTitle = 'Item 1';
  const defaultSlot = 'Hello';

  afterEach(() => {
    wrapper.destroy();
  });

  const createComponent = (props = {}) => {
    wrapper = mount(GlAccordionItem, {
      directives: {
        GlCollapseToggle: GlCollapseToggleDirective,
      },
      propsData: {
        title: defaultTitle,
        ...props,
      },
      slots: {
        default: defaultSlot,
      },
    });
  };

  const findButton = () => wrapper.find(GlButton);
  const findCollapse = () => wrapper.find(BCollapse);

  it('renders button text', () => {
    createComponent();

    expect(
      findButton()
        .find('span')
        .text()
    ).toBe(defaultTitle);
  });

  it('renders slot text', () => {
    createComponent();

    expect(findCollapse().text()).toBe(defaultSlot);
  });

  it('is not expanded by default', () => {
    createComponent();

    expect(findButton().props('icon')).toBe('chevron-right');
    expect(findCollapse().isVisible()).toBe(false);
  });

  it('is expanded on button click', async () => {
    createComponent();

    await findButton().trigger('click');

    expect(findButton().props('icon')).toBe('chevron-down');
    expect(findCollapse().isVisible()).toBe(true);
  });

  it('passes accordion identifier to BCollapse', () => {
    const accordionId = 'my-accordion';

    createComponent({ accordion: accordionId });

    expect(findCollapse().props('accordion')).toBe(accordionId);
  });

  it('expands initially when visible prop is passed', async () => {
    createComponent({ visible: true });

    await wrapper.vm.$nextTick();

    expect(findButton().props('icon')).toBe('chevron-down');
    expect(findCollapse().isVisible()).toBe(true);
  });
});
