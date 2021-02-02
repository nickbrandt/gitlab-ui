import { GlToggle } from '../../../../index';

const template = `
<div class="gl-font-base">
  <gl-toggle
    v-model="toggleTrue"
    :name="name"
    :disabled="disabled"
    :is-loading="isLoading"
    :label="label"
    :help="help"
    :aria-describedby="ariaDescribedby"
    :label-position="labelPosition"
  />
</div>
`;

const defaultValue = (prop) => GlToggle.props[prop].default;

const generateProps = ({
  name = defaultValue('name'),
  value = defaultValue('value'),
  disabled = defaultValue('disabled'),
  isLoading = defaultValue('isLoading'),
  help = 'Help text.',
  ariaDescribedby = defaultValue('ariaDescribedby'),
  labelPosition = defaultValue('labelPosition'),
} = {}) => ({
  name,
  value,
  disabled,
  isLoading,
  label: 'Label',
  help,
  ariaDescribedby,
  labelPosition,
});

export default {
  title: 'base/Toggle',
  component: GlToggle,
  argTypes: {
    value: {
      control: {
        type: 'boolean',
      },
    },
    labelPosition: {
      control: {
        type: 'select',
        options: ['hidden', 'top', 'left'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  data() {
    return {
      toggleTrue: true,
    };
  },
  components: { GlToggle },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithLeftLabelAndNoHelpText = Template.bind({});
WithLeftLabelAndNoHelpText.args = generateProps({
  labelPosition: 'left',
  help: '',
});
