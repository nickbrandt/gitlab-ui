import { shallowMount } from '@vue/test-utils';
import Label from '../../../src/components/base/label/label.vue';
import GlLink from '../../../src/components/base/link/link.vue';
import GlTooltip from '../../../src/components/base/tooltip/tooltip.vue';

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
  const findDocLink = () => wrapper.findAll(GlLink).at(1);
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

      expect(wrapper.classes()).toContain('gl-label-text-dark');
    });

    it('renders a white label if background color is dark', () => {
      createComponent({ ...defaultProps, backgroundColor: navy.hex });

      expect(wrapper.classes()).toContain('gl-label-text-light');
    });

    it('supports short hex for background color to infer text color', () => {
      createComponent({ ...defaultProps, backgroundColor: white.shorthex });

      expect(findTitle().attributes('style')).toContain(`background-color: ${white.rgb}`);
      expect(wrapper.classes()).toContain('gl-label-text-dark');
    });

    it('supports rgba for background color to infer text color', () => {
      createComponent({ ...defaultProps, backgroundColor: white.rgba });

      expect(findTitle().attributes('style')).toContain(`background-color: ${white.rgb}`);
      expect(wrapper.classes()).toContain('gl-label-text-dark');
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
  });

  describe('scoped label', () => {
    const scopedProps = {
      ...defaultProps,
      title: 'scoped::label',
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
      createComponent({ ...defaultProps });

      expect(wrapper.classes()).toContain('gl-label-text-dark');
    });

    it('renders a white label if background color is dark', () => {
      createComponent({ ...defaultProps, backgroundColor: navy.hex });

      expect(wrapper.classes()).toContain('gl-label-text-light');
    });

    it('renders the right side color as background color of left side if background color is dark', () => {
      createComponent({ ...scopedProps, backgroundColor: navy.hex });

      expect(findSubTitle().attributes('style')).toContain(`color: ${navy.rgb}`);
    });

    it('renders the right side color as black if background color is light', () => {
      createComponent({ ...scopedProps, color: grey.hex });

      expect(findSubTitle().attributes('style')).toContain('rgb(51, 51, 51)');
    });

    it('renders the label description', () => {
      const props = { ...scopedProps, description: 'lorem ipsum' };

      createComponent(props);

      expect(findTooltipText()).toEqual(props.description);
    });

    it('links to label target', () => {
      const props = { ...scopedProps, target: 'http://local.host' };
      createComponent(props);
      expect(findLink().attributes('href')).toEqual(props.target);
    });

    it('links to scoped label documentation link', () => {
      const props = { ...scopedProps, scopedLabelsDocumentationLink: 'http://local.host' };

      createComponent(props);

      expect(findDocLink().attributes('href')).toEqual(props.scopedLabelsDocumentationLink);
    });
  });
});
