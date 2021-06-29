import ChartTooltip from '../../src/components/charts/tooltip/tooltip.vue';

export const ChartTooltipStub = {
  props: ChartTooltip.props,
  template: `
    <div>
      <slot name="title" />
      <slot />
    </div>
    `,
};
