import { shallowMount } from '@vue/test-utils';
import Label from './label.vue';
import GlLink from '../link/link.vue';
import GlTooltip from '../tooltip/tooltip.vue';
import GlIcon from '../icon/icon.vue';

// Light color
const grey = {
  hex: '#CCCCCC',
  rgb: 'rgb(204, 204, 204)',
};
// Dark color
const navy = {
  hex: '#000080',
  rgb: 'rgb(0, 0, 128)',
};

const white = {
  shorthex: '#FFF',
  rgb: 'rgb(255, 255, 255)',
  rgba: 'rgba(255, 255, 255, 1)',
};

const defaultProps = {
  title: 'title',
  backgroundColor: grey.rgb,
};

describe('Label component', () => {
  let wrapper;

  const createComponent = propsData => {
    wrapper = shallowMount(Label, {
      propsData,
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  const findLink = () => wrapper.find(GlLink);
  const findTitle = () => wrapper.find('.gl-label-text');
  const findSubTitle = () => wrapper.findAll('.gl-label-text').at(1);
  const findTooltipText = () => wrapper.find(GlTooltip).text();

  describe('basic label', () => {
    it('renders the label title', () => {
      const title = 'Label Title';
      createComponent({ ...defaultProps, title });
      expect(findTitle().text()).toEqual(title);
    });

    it('renders the label background color', () => {
      createComponent({ ...defaultProps });

      expect(findTitle().attributes('style')).toContain(
        `background-color: ${defaultProps.backgroundColor}`
      );
    });

    it('renders a black label', () => {
      createComponent({ ...defaultProps });

      expect(findTitle().classes()).toContain('gl-label-text-dark');
    });

    it('renders a white label if background color is dark', () => {
      createComponent({ ...defaultProps, backgroundColor: navy.hex });

      expect(findTitle().classes()).toContain('gl-label-text-light');
    });

    it('supports short hex for background color to infer text color', () => {
      createComponent({ ...defaultProps, backgroundColor: white.shorthex });

      expect(findTitle().attributes('style')).toContain(`background-color: ${white.rgb}`);
      expect(findTitle().classes()).toContain('gl-label-text-dark');
    });

    it('supports rgba for background color to infer text color', () => {
      createComponent({ ...defaultProps, backgroundColor: white.rgba });

      expect(findTitle().attributes('style')).toContain(`background-color: ${white.rgb}`);
      expect(findTitle().classes()).toContain('gl-label-text-dark');
    });

    it('renders the label description', () => {
      const props = { ...defaultProps, description: 'lorem ipsum' };

      createComponent(props);

      expect(wrapper.html()).toContain(props.description);
    });

    it('links to label target', () => {
      const props = { ...defaultProps, target: 'http://local.host' };

      createComponent(props);

      expect(wrapper.find(GlLink).attributes('href')).toEqual(props.target);
    });

    describe('close button', () => {
      it('does not render by default', () => {
        createComponent({ ...defaultProps });

        expect(wrapper.find(GlIcon).exists()).toBe(false);
      });

      it('renders when viewOnly is false', () => {
        const props = { ...defaultProps, viewOnly: false };

        createComponent(props);

        expect(wrapper.find(GlIcon).exists()).toBe(true);
      });

      it('has a dark background when text is light', () => {
        const props = { ...defaultProps, viewOnly: false };

        createComponent(props);

        expect(wrapper.find(GlIcon).classes()).toContain('gl-label-close-dark');
      });

      it('has a light background when text is dark', () => {
        const props = { ...defaultProps, viewOnly: false, backgroundColor: navy.hex };

        createComponent(props);

        expect(wrapper.find(GlIcon).classes()).toContain('gl-label-close-light');
      });

      it('emits close when "x" is clicked', () => {
        const props = { ...defaultProps, viewOnly: false };

        createComponent(props);

        wrapper.find('[data-testid="close-button"]').trigger('click');
        expect(wrapper.emitted().close).toBeTruthy();
      });
    });
  });

  describe('basic label with scoped title', () => {
    const props = {
      ...defaultProps,
      title: 'scoped::label',
    };

    it('renders title as basic label', () => {
      createComponent({ ...props });

      expect(findTitle().text()).toEqual('scoped::label');
    });
  });

  describe('scoped label', () => {
    const scopedProps = {
      ...defaultProps,
      title: 'scoped::label',
      scoped: true,
    };

    it('renders the scoped title', () => {
      createComponent({ ...scopedProps });

      expect(findTitle().text()).toEqual('scoped');
      expect(findSubTitle().text()).toEqual('label');
    });

    it('renders the label background color', () => {
      createComponent({ ...scopedProps });

      expect(findTitle().attributes('style')).toContain(
        `background-color: ${defaultProps.backgroundColor};`
      );
    });

    it('renders a black label', () => {
      createComponent({ ...scopedProps });

      expect(findTitle().classes()).toContain('gl-label-text-dark');
      expect(findSubTitle().classes()).toContain('gl-label-text-dark');
    });

    it('renders a white label if background color is dark', () => {
      createComponent({ ...scopedProps, backgroundColor: navy.hex });

      expect(wrapper.find('.gl-label-text').classes()).toContain('gl-label-text-light');
    });

    it('renders the right side color as background color of left side if background color is dark', () => {
      createComponent({ ...scopedProps, backgroundColor: navy.hex });

      expect(findSubTitle().attributes('style')).toContain(`color: ${navy.rgb}`);
    });

    it('inherits text color from parent if background color is light', () => {
      createComponent({ ...scopedProps, color: grey.hex });

      expect(findSubTitle().classes()).toEqual(['gl-label-text', 'gl-label-text-dark']);
    });

    it('renders the label description', () => {
      const props = { ...scopedProps, description: 'lorem ipsum' };

      createComponent(props);

      expect(findTooltipText()).toContain(props.description);
      expect(findTooltipText()).toContain('Scoped label');
    });

    it('links to label target', () => {
      const props = { ...scopedProps, target: 'http://local.host' };
      createComponent(props);
      expect(findLink().attributes('href')).toEqual(props.target);
    });

    it('supports title with multiple occurences of ::', () => {
      const props = { ...scopedProps, title: 'one::two::three' };
      createComponent(props);
      expect(findTitle().text()).toEqual('one::two');
      expect(findSubTitle().text()).toEqual('three');
    });

    describe('close button', () => {
      it('does not render by default', () => {
        const props = { ...scopedProps };
        createComponent(props);

        expect(wrapper.find(GlIcon).exists()).toBe(false);
      });

      it('renders when viewOnly is false', () => {
        const props = { ...scopedProps, viewOnly: false };
        createComponent(props);

        expect(wrapper.find(GlIcon).exists()).toBe(true);
      });

      it('shows backgroundColor when hovered', async () => {
        const props = { ...scopedProps, backgroundColor: navy.rgb, viewOnly: false };
        createComponent(props);
        wrapper.setData({ isCloseHover: true });

        await wrapper.vm.$nextTick();
        expect(wrapper.find(GlIcon).attributes('style')).toContain(`background-color: ${navy.rgb}`);
      });
    });
  });
});
