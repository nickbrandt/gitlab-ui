<script>
import GlButton from '../button/button.vue';
import GlButtonGroup from '../button_group/button_group.vue';
import GlIcon from '../icon/icon.vue';

export default {
  name: 'GlKeysetPagination',
  components: {
    GlButtonGroup,
    GlButton,
    GlIcon,
  },
  props: {
    // The following 4 properties match the default names of the
    // [PageInfo](https://docs.gitlab.com/ee/api/graphql/reference/index.html#pageinfo)
    // GraphQL type, allowing the returned `pageInfo` object to
    // be bound directly to this component:
    // `<gl-keyset-pagination v-bind="pageInfo">`
    hasPreviousPage: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasNextPage: {
      type: Boolean,
      required: false,
      default: false,
    },
    startCursor: {
      type: String,
      required: false,
      default: null,
    },
    endCursor: {
      type: String,
      required: false,
      default: null,
    },

    prevText: {
      type: String,
      required: false,
      default: 'Prev',
    },
    prevButtonLink: {
      type: String,
      required: false,
      default: null,
    },
    nextText: {
      type: String,
      required: false,
      default: 'Next',
    },
    nextButtonLink: {
      type: String,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<template>
  <gl-button-group class="gl-keyset-pagination" v-bind="$attrs" v-on="$listeners">
    <gl-button
      :href="prevButtonLink"
      :disabled="disabled || !hasPreviousPage"
      data-testid="prevButton"
      @click="$emit('prev', startCursor)"
    >
      <slot name="previous-button-content">
        <div class="gl-display-flex gl-align-center">
          <gl-icon name="chevron-left" />
          {{ prevText }}
        </div>
      </slot>
    </gl-button>
    <gl-button
      :href="nextButtonLink"
      :disabled="disabled || !hasNextPage"
      data-testid="nextButton"
      @click="$emit('next', endCursor)"
    >
      <slot name="next-button-content">
        <div class="gl-display-flex gl-align-center">
          {{ nextText }}
          <gl-icon name="chevron-right" />
        </div>
      </slot>
    </gl-button>
  </gl-button-group>
</template>
