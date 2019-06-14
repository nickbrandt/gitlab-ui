import { shallowMount, createLocalVue } from '@vue/test-utils';
import Label from '../../../components/base/label/label.vue';

const localVue = createLocalVue();
const defaultProps = {
  color: 'white',
  backgroundColor: 'red',
};

describe('Label component', () => {
  let wrapper;

  const createComponent = (propsData, title = 'Hello world') =>
    shallowMount(Label, {
      slots: {
        default: title,
      },
      localVue,
      propsData,
    });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the label title', () => {
    const title = 'Label Tite';
    wrapper = createComponent({ ...defaultProps }, title);
    expect(wrapper.find('.color-label').text()).toEqual(title);
  });

  it('renders the label background color', () => {
    const backgroundStyle = `background-color: ${defaultProps.backgroundColor};`;
    wrapper = createComponent({ ...defaultProps });
    expect(wrapper.find('.color-label').attributes('style')).toContain(backgroundStyle);
  });

  it('renders the label color', () => {
    const colorStyle = `color: ${defaultProps.color};`;
    wrapper = createComponent({ ...defaultProps });
    expect(wrapper.find('.color-label').attributes('style')).toContain(colorStyle);
  });

  it('renders the label desciption', () => {
    const props = { ...defaultProps, desciption: 'lorem ipsum' };

    wrapper = createComponent(props);
    expect(wrapper.html()).toContain(props.desciption);
  });

  it('links to label target', () => {
    const props = { ...defaultProps, target: 'http://local.host' };
    wrapper = createComponent(props);
    expect(wrapper.find('.js-label-wrapper').attributes('href')).toEqual(props.target);
  });

  describe('Scoped labels', () => {
    const props = {
      ...defaultProps,
      isScoped: true,
      desciption: 'lorem ipsum',
      scopedLabelsDocumentationLink: 'http://local.host',
    };

    beforeEach(() => {
      wrapper = createComponent(props);
    });

    it('renders label icon', () => {
      expect(wrapper.find('.fa-question-circle').exists()).toBe(true);
    });

    it('icon links to documentation', () => {
      expect(wrapper.find('.scoped-label').attributes('href')).toEqual(
        props.scopedLabelsDocumentationLink
      );
    });
  });
});
