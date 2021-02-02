import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { sizeOptions } from '../../../../utils/constants';
import readme from './form_group.md';
import { GlFormGroup } from '../../../../../index';
import { validationStates } from './form_group.vue';

const components = {
  GlFormGroup,
};

function generateProps({
  id = 'group-1',
  label = 'Label Name',
  description = 'form group description',
  horizontal = false,
} = {}) {
  return {
    id: {
      type: String,
      default: text('id', id),
    },
    label: {
      type: String,
      default: text('label', label),
    },
    labelSize: {
      type: String,
      default: select('label-size', sizeOptions, sizeOptions.sm),
    },
    description: {
      type: String,
      default: text('description', description),
    },
    horizontal: {
      type: Boolean,
      default: boolean('horizontal', horizontal),
    },
  };
}

documentedStoriesOf('base/form/form-group', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-form-group
        :id="id"
        :label="label"
        :label-size="labelSize"
        :description="description"
        :horizontal="horizontal"
        label-for="label1"
      >
        <gl-form-input id="input1" />
      </gl-form-group>
    `,
  }))
  .add('disabled', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-form-group
        id="group-id"
        label="Label Name"
        label-size="sm"
        description="This feature is disabled"
        label-for="input1"
      >
        <gl-form-input id="input1"  type="text" :disabled="true" value="Disabled" />
      </gl-form-group>
    `,
  }))
  .add('with textarea', () => ({
    template: `
      <gl-form-group id="group-id-textarea2" label="Label Name" label-for="textarea2">
        <gl-form-textarea id="textarea2" placeholder="Enter something" />
      </gl-form-group>
    `,
  }))
  .add('with validations', () => ({
    data: () => ({
      username: 'an illegally long username',
    }),
    computed: {
      state() {
        const { username } = this;
        if (username.length === 0) {
          return validationStates.DEFAULT;
        }
        if (username.length <= 10) {
          return validationStates.VALID;
        }
        if (username.length <= 15) {
          return validationStates.WARNING;
        }
        return validationStates.INVALID;
      },
    },
    template: `
      <gl-form-group label="Username" description="Enter your username" :state="state">
        <gl-form-input v-model="username" />
        <template #valid-feedback>
          Great username
        </template>
        <template #warning-feedback>
          Your username is getting a bit long
        </template>
        <template #invalid-feedback>
          Your username is definitely too long
        </template>
      </gl-form-group>
    `,
  }));
