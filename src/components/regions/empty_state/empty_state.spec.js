import { shallowMount } from '@vue/test-utils';
import EmptyState from './empty_state.vue';
import Button from '~/components/base/button/button.vue';

describe('empty state component', () => {
  let component;
  const props = {
    title: 'Empty State Title',
    description: 'Empty state description.',
    svgPath: 'https://www.example.com/test.jpg',
    svgHeight: 150,
    primaryButtonText: 'Primary Button',
    primaryButtonLink: 'http://example.com/primary',
    secondaryButtonText: 'Secondary Button',
    secondaryButtonLink: 'http://example.com/secondary',
  };

  describe('with no buttons', () => {
    beforeEach(() => {
      component = shallowMount(EmptyState, {
        propsData: {
          title: props.title,
          description: props.description,
          svgPath: props.svgPath,
          svgHeight: props.svgHeight,
        },
      });
    });

    it('should render the title', () => {
      const title = component.find('h1');
      expect(title.text()).toBe(props.title);
    });

    it('should render the description', () => {
      const description = component.find('p');
      expect(description.text()).toBe(props.description);
    });

    it('should pass through the SVG path', () => {
      const image = component.find('img');
      expect(image.attributes().src).toBe(props.svgPath);
    });

    it('should pass through the SVG height integer', () => {
      const image = component.find('img');
      expect(image.attributes().height).toBe(props.svgHeight.toString());
    });
  });

  describe('with a primary button', () => {
    beforeEach(() => {
      component = shallowMount(EmptyState, {
        propsData: {
          title: props.title,
          svgPath: props.svgPath,
          primaryButtonLink: props.primaryButtonLink,
          primaryButtonText: props.primaryButtonText,
        },
      });
    });

    it('should only render one button', () => {
      const buttons = component.findAllComponents(Button);
      expect(buttons).toHaveLength(1);
    });

    it('should render the primary button', () => {
      const button = component.findComponent(Button);
      expect(button.attributes().href).toBe(props.primaryButtonLink);
    });
  });

  describe('with a secondary button', () => {
    beforeEach(() => {
      component = shallowMount(EmptyState, {
        propsData: {
          title: props.title,
          secondaryButtonLink: props.secondaryButtonLink,
          secondaryButtonText: props.secondaryButtonText,
        },
      });
    });

    it('should only render the secondary button', () => {
      const buttons = component.findAllComponents(Button);
      const button = buttons.at(0);

      expect(buttons).toHaveLength(1);
      expect(button.props('variant')).toBe('default');
      expect(button.text()).toBe(props.secondaryButtonText);
      expect(button.attributes('href')).toBe(props.secondaryButtonLink);
    });
  });

  describe('with a primary and secondary button', () => {
    beforeEach(() => {
      component = shallowMount(EmptyState, {
        propsData: {
          title: props.title,
          svgPath: props.svgPath,
          primaryButtonLink: props.primaryButtonLink,
          primaryButtonText: props.primaryButtonText,
          secondaryButtonLink: props.secondaryButtonLink,
          secondaryButtonText: props.secondaryButtonText,
        },
      });
    });

    it('should render two buttons', () => {
      const buttons = component.findAllComponents(Button);
      expect(buttons).toHaveLength(2);
    });

    it('should render the primary button', () => {
      const button = component.findComponent(Button);
      expect(button.attributes().href).toBe(props.primaryButtonLink);
    });

    it('should also render the secondary button', () => {
      const button = component.findAllComponents(Button).at(1);
      expect(button.attributes().href).toBe(props.secondaryButtonLink);
    });
  });

  describe('with custom actions', () => {
    beforeEach(() => {
      component = shallowMount(EmptyState, {
        propsData: {
          title: props.title,
          svgPath: props.svgPath,
          primaryButtonLink: props.primaryButtonLink,
          primaryButtonText: props.primaryButtonText,
          secondaryButtonLink: props.secondaryButtonLink,
          secondaryButtonText: props.secondaryButtonText,
        },
        slots: {
          actions: '<button>Custom button</button>',
        },
      });
    });

    it(`should render slot's contents instead of default buttons`, () => {
      const defaultButtons = component.findAllComponents(Button);
      const customButtons = component.find('button');
      expect(defaultButtons.length).toBe(0);
      expect(customButtons.exists()).toBe(true);
    });
  });

  describe('with different descriptions', () => {
    it('should render description from prop', () => {
      component = shallowMount(EmptyState, {
        propsData: {
          ...props,
        },
      });

      const description = component.find('p');
      expect(description.text()).toBe(props.description);
    });

    it('should render description from slot', () => {
      const slotDescription = 'Slotted description';

      component = shallowMount(EmptyState, {
        propsData: {
          ...props,
          description: null,
        },
        slots: {
          description: `<span id="slotted">${slotDescription}</span>`,
        },
      });

      const description = component.find('#slotted');
      expect(description.text()).toBe(slotDescription);
    });

    it('should render a slotted description over a props description', () => {
      const slotDescription = 'Slotted description';

      component = shallowMount(EmptyState, {
        propsData: {
          ...props,
        },
        slots: {
          description: `<span id="slotted">${slotDescription}</span>`,
        },
      });

      const description = component.find('#slotted');
      const p = component.find('p');

      expect(description.text()).toBe(slotDescription);
      expect(p.text()).not.toBe(props.description);
    });
  });
});
