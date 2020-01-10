import BasicExample from './form_input_group.basic.example.vue';
import ReactiveExample from './form_input_group.reactive.example.vue';
import PredefinedOptionsExample from './form_input_group.predefined_options.example.vue';
import PredefinedReactiveExample from './form_input_group.predefined_reactive.example.vue';

export default [
  {
    name: 'Text Input Group',
    items: [
      {
        id: 'input-text-group',
        name: 'Basic',
        component: BasicExample,
      },
      {
        id: 'input-text-group-reactive',
        name: 'Reactive update of/from the component',
        component: ReactiveExample,
      },
      {
        id: 'input-text-group-predefined-options',
        name: 'With predefined options',
        component: PredefinedOptionsExample,
      },
      {
        id: 'input-text-group-predefined-reactive',
        name: 'With predefined options and reactive updates',
        component: PredefinedReactiveExample,
      },
    ],
  },
];
