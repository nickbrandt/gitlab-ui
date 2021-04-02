import readme from './form_invalid_feedback.md';
import GlFormInvalidFeedback from './form_invalid_feedback.vue';

const defaultValue = (prop) => GlFormInvalidFeedback.props[prop].default;

const generateProps = ({ state = defaultValue('state') } = {}) => ({
  state,
});

const Template = (args, { argTypes }) => ({
  components: { GlFormInvalidFeedback },
  props: Object.keys(argTypes),
  template: `
    <gl-form-invalid-feedback :state="state">Some custom invalid feedback</gl-form-invalid-feedback>
  `,
});

export const Default = Template.bind({});
Default.args = generateProps({
  state: false,
});

export default {
  title: 'base/form/form_input_group/form_invalid_feedback',
  component: GlFormInvalidFeedback,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
