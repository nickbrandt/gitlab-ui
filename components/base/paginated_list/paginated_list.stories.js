import { withKnobs, object, array, boolean, number, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './paginated_list.md';
import { GlPaginatedList, GlButton } from '../../../index';

const components = {
  GlPaginatedList,
  GlButton,
};

const list = [
  { id: 'foo' },
  { id: 'bar' },
  { id: 'baz' },
  { id: 'qux' },
  { id: 'quux' },
  { id: 'corge' },
  { id: 'grault' },
  { id: 'garply' },
  { id: 'waldo' },
  { id: 'fred' },
  { id: 'xyzzy' },
  { id: 'plugh' },
  { id: 'thud' },
];

const emptyList = [];

const template = `
  <gl-paginated-list
  :list="list"
  :perPage="perPage"
  :page="page"
  :filterable="filterable"
  :filter="filter"
  :emptyMessage="emptyMessage"
  :emptySearchMessage="emptySearchMessage"
  />
`;

const templateWithSubheader = `
  <gl-paginated-list
  :list="list"
  :perPage="perPage"
  :page="page"
  :filterable="filterable"
  :filter="filter"
  :emptyMessage="emptyMessage"
  :emptySearchMessage="emptySearchMessage"
  >

  <template #subheader>
    Dropdown content can go here when like when an action button is clicked 
  </template>
  
  </gl-paginated-list>
`;

const templateWithHeader = `
  <gl-paginated-list
  :list="list"
  :perPage="perPage"
  :page="page"
  :filterable="filterable"
  :filter="filter"
  :emptyMessage="emptyMessage"
  :emptySearchMessage="emptySearchMessage"
  >

    <template #header>
      <gl-button
        variant="success"
        class="order-1"
        @click="alert"
      >
        Foo Button
      </gl-button>
    </template>
  
  </gl-paginated-list>
`;

const templateWithRow = `
<gl-paginated-list
:list="list"
:perPage="perPage"
:page="page"
:filterable="filterable"
:filter="filter"
:emptyMessage="emptyMessage"
:emptySearchMessage="emptySearchMessage"
>

  <template slot-scope="{ listItem }"  >
    <gl-button
    variant="success"
    class="order-1"
    @click="alert"
    >
      {{ listItem.id }}
    </gl-button>
  </template>

</gl-paginated-list>
`;

function generateProps() {
  return {
    list: {
      type: Array,
      default: object('list', list),
    },
    perPage: {
      type: Number,
      default: number('perPage', 10),
    },
    page: {
      type: Number,
      default: number('page', 1),
    },
    filterable: {
      type: Boolean,
      default: boolean('filterable', true),
    },
    filter: {
      type: String,
      default: text('filter', 'id'),
    },
    itemKey: {
      type: String,
      default: text('itemKey', 'id'),
    },
    emptyMessage: {
      type: String,
      default: text('emptyMessage', 'There are currently no items in this list.'),
    },
    emptySearchMessage: {
      type: String,
      default: text('emptySearchMessage', 'Sorry, your filter produced no results.'),
    },
  };
}

documentedStoriesOf('base|paginated-list', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('no filter', () => ({
    props: {
      ...generateProps(),
      filterable: {
        type: Boolean,
        default: false,
      },
    },
    components,
    template,
  }))
  .add('with empty list', () => ({
    props: {
      ...generateProps(),
      list: {
        type: Array,
        default: array('list', emptyList),
      },
    },
    components,
    template,
  }))
  .add('with header slot', () => ({
    props: generateProps(),
    components,
    template: templateWithHeader,
    methods: {
      alert() {
        // eslint-disable-next-line no-alert
        window.alert('clicked');
      },
    },
  }))
  .add('with subheader slot', () => ({
    props: generateProps(),
    components,
    template: templateWithSubheader,
  }))
  .add('with row slot', () => ({
    props: generateProps(),
    components,
    template: templateWithRow,
    methods: {
      alert() {
        // eslint-disable-next-line no-alert
        window.alert('clicked');
      },
    },
  }));
