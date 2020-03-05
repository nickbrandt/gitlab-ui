import { withKnobs, object } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './infinite_scroll.md';

const items = [
  { name: 'One' },
  { name: 'Two' },
  { name: 'Tres' },
  { name: 'Quattro' },
  { name: 'Funf' },
  { name: 'Seis' },
  { name: 'Seven' },
  { name: 'Huit' },
  { name: 'Neun' },
  { name: 'Ten' },
  { name: 'Elf' },
  { name: 'Zwolf' },
  { name: 'Thirteen' },
  { name: 'Catorce' },
  { name: 'Funfzehn' },
  { name: 'Seize' },
  { name: 'Seventeen' },
  { name: 'Atten' },
  { name: '십구' },
  { name: '二十' },
];

documentedStoriesOf('base|infinite-scroll', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {
      items: {
        default: object('items', items),
      },
    },
    data() {
      return {
        fetchedItems: 10,
      };
    },
    computed: {
      visibleItems() {
        return this.items.slice(0, this.fetchedItems);
      },
    },
    methods: {
      bottomReached() {
        setTimeout(() => {
          this.fetchedItems = this.items.length;
        }, 1000);
      },
    },
    template: `
      <gl-infinite-scroll
        :max-list-height=300
        :fetched-items=fetchedItems
        :total-items=items.length
        @bottomReached=bottomReached
      >
        <template #items>
          <ul class="list-group list-group-flush list-unstyled">
            <li v-for="item in visibleItems" :key="item.name" class="list-group-item">
              {{ item.name }}
            </li>
          </ul>
        </template>
      </gl-infinite-scroll>
    `,
  }));
