import TooltipDirectiveDefaultExample from './tooltip.directive_default.example.vue';
import TooltipDirectiveRightExample from './tooltip.directive_right.example.vue';
import TooltipDirectiveBottomExample from './tooltip.directive_bottom.example.vue';
import TooltipDirectiveLeftExample from './tooltip.directive_left.example.vue';
import TooltipDirectiveTopLeftExample from './tooltip.directive_topleft.example.vue';
import TooltipDirectiveTopRightExample from './tooltip.directive_topright.example.vue';

import TooltipComponentDefaultExample from './tooltip.component_default.example.vue';

export default [
  {
    name: 'Directive',
    items: [
      {
        id: 'tooltip-directive',
        name: 'Default',
        description: 'Default Tooltip Directive Use Case',
        component: TooltipDirectiveDefaultExample,
      },
      {
        id: 'tooltip-directive-right',
        name: 'To the right',
        description: 'Directive Tooltip to the right',
        component: TooltipDirectiveRightExample,
      },
      {
        id: 'tooltip-directive-bottom',
        name: 'To the bottom',
        description: 'Directive Tooltip to the bottom',
        component: TooltipDirectiveBottomExample,
      },
      {
        id: 'tooltip-directive-left',
        name: 'To the left',
        description: 'Directive Tooltip to the left',
        component: TooltipDirectiveLeftExample,
      },
      {
        id: 'tooltip-directive-topleft',
        name: 'To the top left',
        description: 'Directive Tooltip to the top left',
        component: TooltipDirectiveTopLeftExample,
      },
      {
        id: 'tooltip-directive-topright',
        name: 'To the top right',
        description: 'Directive Tooltip to the top right',
        component: TooltipDirectiveTopRightExample,
      },
    ],
  },
  {
    name: 'Component',
    items: [
      {
        id: 'tooltip-default',
        name: 'HTML',
        description: 'Default Tooltip Component Use Case',
        component: TooltipComponentDefaultExample,
      },
    ],
  },
];
