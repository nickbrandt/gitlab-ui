import { withKnobs, boolean } from '@storybook/addon-knobs/vue';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import readme from './form_checkbox_tree.md';
import GlFormCheckboxTree from './form_checkbox_tree.vue';
import GlToken from '../../token/token.vue';

const components = {
  GlFormCheckboxTree,
  GlToken,
};

documentedStoriesOf('base/form/form-checkbox-tree', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {
      hideToggleAll: {
        default: boolean('Hide toggle all checkbox?', false),
      },
    },
    data: () => ({
      checked: [1, 11, 12, 121, 122, 2113, 3],
      options: [
        {
          value: 1,
          label: 'Felidae',
          children: [
            {
              value: 11,
              label: 'Lion',
            },
            {
              value: 12,
              label: 'Felinae',
              children: [
                {
                  value: 121,
                  label: 'Cheetah',
                },
                {
                  value: 122,
                  label: 'Ocelot',
                },
              ],
            },
          ],
        },
        {
          value: 2,
          label: 'Canidae',
          children: [
            {
              value: 21,
              label: 'Caninae',
              children: [
                {
                  value: 211,
                  label: 'Canis lupus',
                  children: [
                    {
                      value: 2112,
                      label: 'Wolf',
                    },
                    {
                      value: 2113,
                      label: 'Himalayan wolf',
                    },
                    {
                      value: 2114,
                      label: 'Dingo',
                    },
                  ],
                },
                {
                  value: 212,
                  label: 'Black-backed jackal',
                },
              ],
            },
            {
              value: 22,
              label: 'Fennec fox',
            },
          ],
        },
        {
          value: 3,
          label: 'Karabair',
        },
        {
          value: 4,
          label: 'Okapi',
        },
      ],
    }),
    components,
    template: `
      <div>
        <gl-form-checkbox-tree :hide-toggle-all="hideToggleAll" :options="options" v-model="checked" />
        Selected options:
        <gl-token v-for="value in checked" :key="value" class="gl-mr-1" view-only>{{ value }}</gl-token>
      </div>
    `,
  }));
