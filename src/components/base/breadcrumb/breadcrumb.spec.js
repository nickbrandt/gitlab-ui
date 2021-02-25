import { shallowMount } from '@vue/test-utils';
import { BBreadcrumbItem } from 'bootstrap-vue';
import Breadcrumb from './breadcrumb.vue';

describe('Broadcast message component', () => {
  let wrapper;

  const items = [
    { text: 'first_breadcrumb', href: 'http://gitlab.com' },
    {
      text: 'second_breadcrumb',
      to: 'to_value',
    },
    { text: 'third_breadcrumb', href: 'http://about.gitlab.com' },
  ];

  const findAvatarSlot = () => wrapper.find('[data-testid="avatar-slot"]');
  const findSeparatorSlot = () => wrapper.find('[data-testid="separator-slot"]');
  const findBreadcrumbItems = () => wrapper.findAllComponents(BBreadcrumbItem);
  const findAllSeparators = () => wrapper.findAll('[data-testid="separator"]');

  const createComponent = (propsData = { items }) => {
    wrapper = shallowMount(Breadcrumb, {
      propsData,
      slots: {
        avatar: '<div data-testid="avatar-slot"></div>',
        separator: '<div data-testid="separator-slot"></div>',
      },
    });
  };

  describe('slots', () => {
    it('has an avatar slot', () => {
      createComponent();

      expect(findAvatarSlot().exists()).toBe(true);
    });

    it('has a separator slot', () => {
      createComponent();

      expect(findSeparatorSlot().exists()).toBe(true);
    });

    it('separator slot is shown only with more than one item', () => {
      createComponent({ items: [items[0]] });

      expect(findSeparatorSlot().exists()).toBe(false);
    });
  });

  describe('items', () => {
    it('has one breadcrumb-item for each item in the items props', () => {
      createComponent();

      expect(findBreadcrumbItems()).toHaveLength(items.length);
    });

    it(`with ${items.length} items has ${items.length - 1} separators`, () => {
      createComponent();

      expect(findAllSeparators()).toHaveLength(items.length - 1);
    });
  });

  describe('bindings', () => {
    it('first breadcrumb has text and href bound', () => {
      createComponent();

      expect(findBreadcrumbItems().at(0).attributes()).toMatchObject({
        text: items[0].text,
        href: items[0].href,
      });
    });

    it('second breadcrumb has text and to bound', () => {
      createComponent();

      expect(findBreadcrumbItems().at(1).attributes()).toMatchObject({
        text: items[1].text,
        to: items[1].to,
      });
    });
  });
});
