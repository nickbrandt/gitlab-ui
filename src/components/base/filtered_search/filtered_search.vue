<script>
import Vue from 'vue';
import PortalVue from 'portal-vue';
import GlSearchBoxByClick from '../search_box_by_click/search_box_by_click.vue';
import GlFilteredSearchTerm from './filtered_search_term.vue';
import GlIcon from '../icon/icon.vue';
import {
  isEmptyTerm,
  TERM_TOKEN_TYPE,
  normalizeTokens,
  denormalizeTokens,
  needDenormalization,
} from './filtered_search_utils';
import GlTooltip from '../../../directives/tooltip';

Vue.use(PortalVue);

let portalUuid = 0;

function createTerm(data = '') {
  return {
    type: TERM_TOKEN_TYPE,
    value: { data },
  };
}

function initialState() {
  return [createTerm()];
}

export default {
  components: {
    GlSearchBoxByClick,
    GlIcon,
  },
  directives: { GlTooltip },
  inheritAttrs: false,
  props: {
    value: {
      required: false,
      type: Array,
      default: () => [],
    },
    availableTokens: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
    clearButtonTitle: {
      type: String,
      default: 'Clear',
    },
  },
  data() {
    return {
      tokens: initialState(),
      activeTokenIdx: null,
      suggestionsStyle: {},
    };
  },
  provide() {
    portalUuid += 1;
    this.portalName = `filters_portal_${portalUuid}`;

    return {
      portalName: this.portalName,
      alignSuggestions: ref => this.alignSuggestions(ref),
    };
  },
  computed: {
    activeToken() {
      return this.tokens[this.activeTokenIdx];
    },
    lastTokenIdx() {
      return this.tokens.length - 1;
    },
    isLastTokenActive() {
      return this.activeTokenIdx === this.lastTokenIdx;
    },
    hasValue() {
      return this.tokens.length > 1 || this.tokens[0].value.data !== '';
    },
    termPlaceholder() {
      return this.hasValue ? null : this.placeholder;
    },

    currentAvailableTokens() {
      return this.availableTokens.filter(token => {
        if (token.disabled) {
          return false;
        }

        if (token.unique) {
          return !this.tokens.find(t => t.type === token.type);
        }

        return true;
      });
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.tokens = needDenormalization(newValue) ? denormalizeTokens(newValue) : newValue;
        if (this.tokens.length === 0 || this.tokens[this.lastTokenIdx].type !== TERM_TOKEN_TYPE) {
          this.tokens.push(createTerm());
        }
      },
    },
    tokens: {
      handler() {
        this.$emit('input', this.tokens);
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    isLastToken(idx) {
      return !this.activeTokenIdx && idx === this.lastTokenIdx;
    },

    getTokenEntry(type) {
      return this.availableTokens.find(t => t.type === type);
    },

    getTokenComponent(type) {
      return this.getTokenEntry(type)?.token || GlFilteredSearchTerm;
    },

    tokenConfig(type) {
      const cmp = this.getTokenEntry(type);
      if (!cmp) {
        return null;
      }

      const { token, ...config } = cmp;

      return config;
    },

    activate(token) {
      this.activeTokenIdx = token;
    },

    alignSuggestions(ref) {
      const offsetRef = ref.getBoundingClientRect().left;
      const offsetMenu = this.$el.getBoundingClientRect().left;
      const transform = `translateX(${Math.floor(offsetRef - offsetMenu)}px)`;
      this.suggestionsStyle = { transform };
    },

    deactivate(tokenIdx, type) {
      if (tokenIdx === -1 || this.activeTokenIdx !== tokenIdx || this.activeToken.type !== type) {
        return;
      }

      if (
        !this.isLastTokenActive &&
        this.activeToken.type === TERM_TOKEN_TYPE &&
        this.activeToken.value.data.trim() === ''
      ) {
        this.tokens.splice(tokenIdx, 1);
      }

      this.activeTokenIdx = null;
    },

    destroyToken(idx) {
      if (this.tokens.length === 1) {
        return;
      }

      this.tokens.splice(idx, 1);
      if (idx !== 0) {
        this.activeTokenIdx = idx - 1;
      }
    },

    replaceToken(idx, token) {
      this.$set(this.tokens, idx, { ...token, value: { data: '', ...token.value } });
      this.activeTokenIdx = idx;
    },

    createTokens(idx, newStrings = []) {
      if (
        this.activeTokenIdx !== this.lastTokenIdx &&
        newStrings.length === 1 &&
        newStrings[0] === ''
      ) {
        this.activeTokenIdx = this.lastTokenIdx;
        return;
      }

      this.tokens.splice(
        idx + 1,
        0,
        ...newStrings.map(data => ({
          type: TERM_TOKEN_TYPE,
          value: { data },
        }))
      );

      this.activeTokenIdx = idx + newStrings.length;
    },

    completeToken() {
      if (this.activeTokenIdx === this.lastTokenIdx - 1) {
        this.activeTokenIdx = this.lastTokenIdx;
      } else {
        this.activeTokenIdx = null;
      }
    },

    submit() {
      this.$emit('submit', normalizeTokens(this.tokens));
    },

    clearInput() {
      this.tokens = initialState();
    },
  },
};
</script>

<template>
  <gl-search-box-by-click v-bind="$attrs" @submit="submit">
    <template #history-item="slotScope">
      <slot name="history-item" v-bind="slotScope"></slot>
    </template>
    <template #input>
      <div class="gl-filtered-search-scrollable">
        <template v-for="(token, idx) in tokens">
          <component
            :is="getTokenComponent(token.type)"
            ref="tokens"
            :key="`${token.type}-${idx}`"
            v-model="token.value"
            v-bind="tokenConfig(token.type)"
            :active="activeTokenIdx === idx"
            :available-tokens="currentAvailableTokens"
            :current-value="tokens"
            :index="idx"
            :placeholder="termPlaceholder"
            class="gl-filtered-search-item"
            :class="{
              'gl-filtered-search-last-item': isLastToken(idx),
            }"
            @activate="activate(idx)"
            @deactivate="deactivate(idx, token.type)"
            @destroy="destroyToken(idx)"
            @replace="replaceToken(idx, $event)"
            @complete="completeToken"
            @submit="submit"
            @split="createTokens(idx, $event)"
          />
        </template>
      </div>
      <button
        v-if="hasValue"
        v-gl-tooltip.hover
        :title="clearButtonTitle"
        class="gl-search-box-by-click-icon-button gl-search-box-by-click-clear-button"
        name="clear"
        @click="clearInput"
      >
        <gl-icon name="clear" />
      </button>
      <portal-target
        ref="menu"
        :key="activeTokenIdx"
        :name="portalName"
        slim
        :style="suggestionsStyle"
      />
    </template>
  </gl-search-box-by-click>
</template>
