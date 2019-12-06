import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../../documentation/documented_stories';

const template = `
  <div>
    <gl-badge
      :href="href"
      :rel="rel"
      :target="target"
      :active="active"
      :disabled="disabled"
      :to="to"
      :append="append"
      :replace="replace"
      :event="event"
      :activeClass="activeClass"
      :exact="exact"
      :exactActiveClass="exactActiveClass"
      :routerTag="routerTag"
      :noPrefetch="noPrefetch"
      :tag="tag"
      :variant="variant"
      :modifier="modifier"
      :size="size"
      :fontWeightNormal="fontWeightNormal"
    >Testbadge</gl-badge>
  </div>
  `;

const variantOptions = ['neutral', 'info', 'success', 'warning', 'danger'];
const modifierOptions = ['soft', 'average', 'loud'];
const sizeOptions = ['sm', 'md', 'lg'];

const generateProps = () => ({
  variant: {
    type: String,
    default: select('variant', variantOptions, 'neutral'),
  },
  modifier: {
    type: String,
    default: select('modifier', modifierOptions, 'average'),
  },
  size: {
    type: String,
    default: select('size', sizeOptions, 'md'),
  },
  active: {
    type: Boolean,
    default: boolean('active', false),
  },
  fontWeightNormal: {
    type: Boolean,
    default: boolean('fontWeightNormal', false),
  },
  disabled: {
    type: Boolean,
    default: boolean('disabled', false),
  },
  href: {
    type: String,
    default: text('href'),
  },
  rel: {
    type: String,
    default: text('rel'),
  },
  target: {
    type: String,
    default: text('target', '_self'),
  },
  to: {
    type: String,
    default: text('to'),
  },
  append: {
    type: Boolean,
    default: boolean('append', false),
  },
  replace: {
    type: Boolean,
    default: boolean('replace', false),
  },
  event: {
    type: String,
    default: text('event', 'click'),
  },
  activeClass: {
    type: String,
    default: text('activeClass'),
  },
  exact: {
    type: Boolean,
    default: boolean('exact', false),
  },
  exactActiveClass: {
    type: String,
    default: text('exactActiveClass'),
  },
  routerTag: {
    type: String,
    default: text('routerTag', 'a'),
  },
  noPrefetch: {
    type: Boolean,
    default: boolean('noPrefetch', false),
  },
  tag: {
    type: String,
    default: text('tag', 'span'),
  },
});

documentedStoriesOf('base|badge', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    template,
  }));
