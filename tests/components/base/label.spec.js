import { shallowMount } from '@vue/test-utils';
import Label from '../../../components/base/label/label.vue';
import GlLink from '../../../components/base/link/link.vue';
import GlTooltip from '../../../components/base/tooltip/tooltip.vue';

const defaultProps = {
  title: 'title',
  backgroundColor: 'red',
  color: 'dark',
};

describe('Label component', () => {
  let wrapper;

  const createComponent = propsData => {
    wrapper = shallowMount(Label, {
      sync: false,
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

      expect(findTitle().classes()).toContain(`gl-text-black-normal`);
    });

    it('renders a white label if color is light', () => {
      createComponent({ ...defaultProps, color: 'light' });

      expect(findTitle().classes()).toContain(`gl-text-white-light`);
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

      expect(findTitle().classes()).toContain(`gl-text-black-normal`);
    });

    it('renders a white label if color is light', () => {
      createComponent({ ...defaultProps, color: 'light' });

      expect(findTitle().classes()).toContain(`gl-text-white-light`);
    });

    it('renders the right side color as background color of left side if color is light', () => {
      createComponent({ ...scopedProps, color: 'light' });

      expect(findSubTitle().attributes('style')).toContain(
        `color: ${defaultProps.backgroundColor}`
      );
    });

    it('renders the right side color as black if color is set to dark', () => {
      createComponent({ ...scopedProps, color: 'dark' });

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
