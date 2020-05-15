import { withKnobs, text, color, select, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { labelSizeOptions, tooltipPlacements } from '../../../utils/constants';
import readme from './label.md';
import { GlLabel } from '../../../../index';

const components = {
  GlLabel,
};

const generateProps = ({
  title = 'Label title',
  size = labelSizeOptions.default,
  tooltipPlacement = tooltipPlacements.top,
  scoped = false,
  viewOnly = false,
} = {}) => {
  const props = {
    backgroundColor: {
      default: color('Background color', '#D9C2EE'),
    },
    title: {
      default: text('Label title', title),
    },
    description: {
      default: text('Label description', ''),
    },
    size: {
      type: String,
      default: select('Size', labelSizeOptions, size),
    },
    tooltipPlacement: {
      type: String,
      default: select('Tooltip Placement', tooltipPlacements, tooltipPlacement),
    },
    target: {
      default: text('Link to label target', '#'),
    },
    scoped: {
      default: boolean('Label is scoped', scoped),
    },
    scopedLabelsDocumentationLink: {
      default: text('Link to Scoped Labels Documentation', '#'),
    },
    viewOnly: {
      default: boolean('View Only', viewOnly),
    },
  };

  return props;
};

documentedStoriesOf('base|label', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <div class="gl-display-flex">
        <gl-label
          :background-color="backgroundColor"
          :size="size"
          :title="title"
          :description="description"
          :tooltip-placement="tooltipPlacement"
          :target="target"
          :scoped="scoped"
          :scopedLabelsDocumentationLink="scopedLabelsDocumentationLink"
          :viewOnly="viewOnly"
        />
      </div>`,
  }))
  .add('scoped', () => ({
    props: generateProps({ title: 'scoped::label', scoped: true }),
    components,
    template: `
      <div class="gl-display-flex">
        <gl-label
          :background-color="backgroundColor"
          :size="size"
          :title="title"
          :description="description"
          :tooltip-placement="tooltipPlacement"
          :target="target"
          :scoped="scoped"
          :scopedLabelsDocumentationLink="scopedLabelsDocumentationLink"
          :viewOnly="viewOnly"
        />
      </div>
      `,
  }));
