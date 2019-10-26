import SegmentedControlBasicExample from './segmented_control.basic.example.vue';
import SegmentedControlWhitespaceExample from './segmented_control.whitespace.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'segmented-control-basic',
        name: 'Basic',
        description: 'Basic Segmented Control',
        component: SegmentedControlBasicExample,
      },
      {
        id: 'segmented-control-whitespace',
        name: 'Whitespace',
        description: 'Whitespace Segmented control',
        component: SegmentedControlWhitespaceExample,
      },
    ],
  },
];
