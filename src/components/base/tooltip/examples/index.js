import TooltipDirectiveDefaultExample from './tooltip.directive_default.example.vue';
import TooltipDirectiveRightExample from './tooltip.directive_right.example.vue';
import TooltipDirectiveBottomExample from './tooltip.directive_bottom.example.vue';
import TooltipDirectiveLeftExample from './tooltip.directive_left.example.vue';

export default [
  {
    name: 'Directive',
    items: [
      {
        id: 'tooltip-directive',
        name: 'Top (Default)',
        description: 'Top (Default) Tooltip Directive Use Case',
        component: TooltipDirectiveDefaultExample,
      },
      {
        id: 'tooltip-directive-right',
        name: 'Right',
        description: 'Directive Tooltip to the right',
        component: TooltipDirectiveRightExample,
      },
      {
        id: 'tooltip-directive-bottom',
        name: 'Bottom',
        description: 'Directive Tooltip to the bottom',
        component: TooltipDirectiveBottomExample,
      },
      {
        id: 'tooltip-directive-left',
        name: 'Left',
        description: 'Directive Tooltip to the left',
        component: TooltipDirectiveLeftExample,
      },
    ],
  },
];
