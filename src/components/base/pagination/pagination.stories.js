import { withKnobs, number, text, select, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../../documentation/documented_stories';
import GlPagination from './pagination.vue';
import readme from './pagination.md';
import { sizeOptions, alignOptions } from '../../../utils/constants';

const components = {
  GlPagination,
};

function generateBaseProps() {
  return {
    prevText: {
      default: text('Prev button text', '‹ Prev'),
    },
    nextText: {
      default: text('Next button text', 'Next ›'),
    },
    size: {
      default: select('Buttons size', sizeOptions, null),
    },
    disabled: {
      default: boolean('Disabled', false),
    },
  };
}

function generateFullProps({ page = 3, perPage = 10, totalItems = 200 } = {}) {
  return {
    initialPage: {
      default: number('current page', page),
    },
    perPage: {
      default: number('per page', perPage),
    },
    totalItems: {
      default: number('total items', totalItems),
    },
    ...generateBaseProps(),
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
    props: generateFullProps(),
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
  .add('compact', () => ({
    ...defaults,
    data() {
      return {
        page: 1,
        alignOptions,
      };
    },
    props: generateBaseProps(),
    components,
    computed: {
      prevPage() {
        return Math.max(this.page - 1, 0);
      },
      nextPage() {
        const nextPage = this.page + 1;
        return nextPage > 3 ? 0 : nextPage;
      },
    },
    template: `
    <div class="text-center gl-font-base">
      <gl-pagination
        v-model="page"
        :prev-page="prevPage"
        :next-page="nextPage"
        :prev-text="prevText"
        :next-text="nextText"
        :size="size"
        :disabled="disabled"
        :align="alignOptions.center"
      />
      Page {{ page }} of 3
    </div>`,
  }))
  .add('custom rendering', () => ({
    props: generateFullProps(),
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
    props: generateFullProps(),
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
    props: generateFullProps(),
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
    props: generateFullProps(),
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
    props: generateFullProps(),
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
    props: generateFullProps(),
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
    props: generateFullProps(),
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
