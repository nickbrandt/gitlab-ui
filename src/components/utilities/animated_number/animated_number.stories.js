import { setStoryTimeout } from '../../../utils/test_utils';
import readme from './animated_number.md';
import GlAnimatedNumber from './animated_number.vue';

const template = `
  <gl-animated-number :number="number" :decimalPlaces="decimalPlaces" :duration="duration"/>`;

const defaultValue = (prop) => GlAnimatedNumber.props[prop].default;

const generateProps = ({
  number = 100,
  decimalPlaces = defaultValue('decimalPlaces'),
  duration = 1000,
} = {}) => ({
  number,
  decimalPlaces,
  duration,
});

const Template = (args, { argTypes }) => ({
  components: { GlAnimatedNumber },
  props: Object.keys(argTypes),
  template,
  data() {
    return {
      isLoading: false,
      loadTimer: null,
    };
  },
  methods: {
    loadView() {
      clearTimeout(this.loadTimer);
      this.isLoading = true;
      this.loadTimer = setStoryTimeout(() => {
        this.isLoading = false;
      }, 1500);
    },
  },
  mounted() {
    this.loadView();
  },
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'utilities/animated-number',
  component: GlAnimatedNumber,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
