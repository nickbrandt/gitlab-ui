import EmptyStateBasicExample from './empty_state.basic.example.vue';
import EmptyStateNoCustomActions from './empty_state.custom_actions.example.vue';
import EmptyStateMultipleButtonExample from './empty_state.multiple_button.example.vue';
import EmptyStateNoIllustrationExample from './empty_state.no_illustration.example.vue';
import EmptyStatePrimaryButtonExample from './empty_state.primary_button.example.vue';
import EmptyStateSlottedDescription from './empty_state.slotted_description.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'empty-state-basic',
        name: 'Basic',
        description: 'Basic Empty State',
        component: EmptyStateBasicExample,
      },
      {
        id: 'empty-state-primary-button',
        name: 'Primary Button',
        description: 'Empty State With Primary Button',
        component: EmptyStatePrimaryButtonExample,
      },
      {
        id: 'empty-state-multiple-buttons',
        name: 'Multiple Buttons',
        description: 'Empty State With Multiple Buttons',
        component: EmptyStateMultipleButtonExample,
      },
      {
        id: 'empty-state-no-illustration',
        name: 'No Illustration',
        description: 'Empty State With No Illustration',
        component: EmptyStateNoIllustrationExample,
      },
      {
        id: 'empty-state-custom-actions',
        name: 'Custom Actions',
        description: 'Replace default buttons with custom contents',
        component: EmptyStateNoCustomActions,
      },
      {
        id: 'empty-state-slotted-description',
        name: 'Slotted Description',
        description: 'Use a more custom, slotted description',
        component: EmptyStateSlottedDescription,
      },
    ],
  },
];
