import { mount, createLocalVue } from '@vue/test-utils';
import Label from '../../../components/base/label/label.vue';

const localVue = createLocalVue();
const defaultProps = {
  color: 'white',
  backgroundColor: 'red',
};

describe('Label component', () => {
  let wrapper;

  const createComponent = (propsData, title = 'Hello world') =>
    mount(Label, {
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
    const title = 'Label Title';
    wrapper = createComponent({ ...defaultProps }, title);
    expect(wrapper.find('.gl-label').text()).toEqual(title);
  });

  it('renders the label background color', () => {
    const backgroundStyle = `background-color: ${defaultProps.backgroundColor};`;
    wrapper = createComponent({ ...defaultProps });
    expect(wrapper.find('.gl-label').attributes('style')).toContain(backgroundStyle);
  });

  it('renders the label color', () => {
    const colorStyle = `color: ${defaultProps.color};`;
    wrapper = createComponent({ ...defaultProps });
    expect(wrapper.find('.gl-label > a').attributes('style')).toContain(colorStyle);
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
});
