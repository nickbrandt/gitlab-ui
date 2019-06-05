import { withKnobs, number, text, select, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import GlPagination from './pagination.vue';
import readme from './pagination.md';
import { sizeOptions, alignOptions } from '../../../utils/constants';

const components = {
  GlPagination,
};

function generateProps({ page = 3, perPage = 10, totalItems = 200 } = {}) {
  return {
    initialPage: {
      type: Number,
      default: number('current page', page),
    },
    perPage: {
      type: Number,
      default: number('per page', perPage),
    },
    totalItems: {
      type: Number,
      default: number('total items', totalItems),
    },
    prevText: {
      type: String,
      default: text('Prev button text', '‹ Prev'),
    },
    nextText: {
      type: String,
      default: text('Next button text', 'Next ›'),
    },
    size: {
      type: String,
      default: select('Buttons size', sizeOptions, null),
    },
    disabled: {
      type: Boolean,
      default: boolean('Disabled', false),
    },
  };
}

const defaults = {
  data() {
    return {
      page: 3,
      alignOptions,
    };
  },
  watch: {
    initialPage(page) {
      this.page = page;
    },
  },
};

documentedStoriesOf('base|pagination', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    ...defaults,
    components,
    template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      :size="size"
      :disabled="disabled"
      />`,
  }))
  .add('custom rendering', () => ({
    props: generateProps(),
    ...defaults,
    components,
    template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      :size="size"
      :disabled="disabled"
      >
        <template #previous="{ page, disabled }">
          <template v-if="disabled">
            🚫
          </template>
          <template v-else>⏪</template>
        </template>
        <template #next="{ page, disabled }">
          <template v-if="disabled">
            🚫
          </template>
          <template v-else>⏩</template>
        </template>
        <template #ellipsis-left>
          🔍
        </template>
        <template #ellipsis-right>
          🔎
        </template>
        <template #page-number="{ page }">
          #{{ page }}
        </template>
      </gl-pagination>`,
  }))
  .add('link based', () => ({
    props: generateProps(),
    ...defaults,
    components,
    template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      :size="size"
      :disabled="disabled"
      />`,
  }))
  .add('align center', () => ({
    props: generateProps(),
    ...defaults,
    components,
    template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      :size="size"
      :disabled="disabled"
      :align="alignOptions.center"
      />`,
  }))
  .add('align right', () => ({
    props: generateProps(),
    ...defaults,
    components,
    template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      :size="size"
      :disabled="disabled"
      :align="alignOptions.right"
      />`,
  }))
  .add('fill', () => ({
    props: generateProps(),
    ...defaults,
    components,
    template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      :size="size"
      :disabled="disabled"
      :align="alignOptions.fill"
      />`,
  }))
  .add('small buttons', () => ({
    props: generateProps(),
    ...defaults,
    components,
    template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      size="sm"
      :disabled="disabled"
      />`,
  }))
  .add('large buttons', () => ({
    props: generateProps(),
    ...defaults,
    components,
    template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      size="lg"
      :disabled="disabled"
      />`,
  }));
