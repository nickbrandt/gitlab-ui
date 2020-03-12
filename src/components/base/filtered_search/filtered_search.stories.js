import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './filtered_search.md';
import { GlFilteredSearch, GlFilteredSearchToken } from '../../../../index';

const fakeUsers = [
  { id: 1, name: 'User Alpha', username: 'alpha' },
  { id: 2, name: 'User Beta', username: 'beta' },
  { id: 3, name: 'User Gamma', username: 'gamma' },
  { id: 4, name: 'User Delta', username: 'delta' },
  { id: 5, name: 'User Epsilon', username: 'epsilon' },
];

const fakeMilestones = [
  { id: 1, title: '12.7', name: '%12.7' },
  { id: 2, title: '12.8', name: '%12.8' },
  { id: 3, title: '12.9', name: '%12.9' },
  { id: 4, title: '12.10', name: '%12.10' },
  { id: 5, title: 'Backlog', name: 'Backlog' },
];

const UserToken = {
  props: ['value', 'active'],
  inheritAttrs: false,
  data() {
    return {
      loadingView: false,
      loadingSuggestions: false,
      users: [],
      activeUser: null,
    };
  },
  methods: {
    loadView() {
      this.loadingView = true;
      setTimeout(() => {
        this.loadingView = false;
        this.activeUser = fakeUsers.find(u => u.username === this.value.data);
      }, 1000);
    },
    loadSuggestions() {
      this.loadingSuggestions = true;
      setTimeout(() => {
        this.loadingSuggestions = false;
        this.users = fakeUsers;
      }, 2000);
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'value.data': function() {
      if (this.active) {
        this.loadSuggestions();
      }
    },
    active: {
      immediate: true,
      handler(newValue) {
        if (!newValue) {
          this.loadView();
        } else {
          this.loadSuggestions();
        }
      },
    },
  },
  template: `
    <gl-filtered-search-token
      v-bind="{ ...this.$props, ...this.$attrs }"
      v-on="$listeners"
    >
      <template #view="{ inputValue }">
        <gl-loading-icon size="sm" v-if="loadingView" class="gl-mr-2" />
        <gl-avatar :size="16" :entity-name="inputValue" shape="circle" class="gl-mr-2" v-else />
        {{ activeUser ? activeUser.name : inputValue }}
      </template>
      <template #suggestions>
        <template v-if="loadingSuggestions">
          <gl-loading-icon />
        </template>
        <template v-else>
        <gl-filtered-search-suggestion :key="user.id" v-for="user in users" :value="user.username">
          <div class="gl-display-flex">
            <gl-avatar :size="32" :entity-name="user.username" />
            <div>
              <p class="gl-m-0">{{ user.name }}</p>
              <p class="gl-m-0">@{{ user.username }}</p>
            </div>
          </div>
        </gl-filtered-search-suggestion>
        </template>
      </template>
    </gl-filtered-search-token>
  `,
};

const MilestoneToken = {
  props: ['value', 'active'],
  inheritAttrs: false,
  data() {
    return {
      loadingView: false,
      loadingSuggestions: false,
      milestones: [],
    };
  },
  methods: {
    loadSuggestions() {
      this.loadingSuggestions = true;
      setTimeout(() => {
        this.loadingSuggestions = false;
        this.milestones = fakeMilestones;
      }, 2000);
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'value.data': function() {
      if (this.active) {
        this.loadSuggestions();
      }
    },
    active: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.loadSuggestions();
        }
      },
    },
  },
  template: `
    <gl-filtered-search-token
      v-bind="{ ...this.$props, ...this.$attrs }"
      v-on="$listeners"
    >
      <template #suggestions>
        <gl-filtered-search-suggestion value="None">None</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="Any">Any</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="Upcoming">Upcoming</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="Started">Started</gl-filtered-search-suggestion>
        <gl-dropdown-divider v-if="loadingSuggestions || milestones.length" />
        <template v-if="loadingSuggestions">
          <gl-loading-icon />
        </template>
        <template v-else>
        <gl-filtered-search-suggestion :key="milestone.id" v-for="milestone in milestones" :value="milestone.name">
        {{ milestone.title }}
        </gl-filtered-search-suggestion>
        </template>
      </template>
    </gl-filtered-search-token>
  `,
};

const tokens = [
  {
    type: 'author',
    icon: 'pencil',
    title: 'Author',
    dataType: 'user',
    unique: true,
    token: UserToken,
  },
  { type: 'user', icon: 'user', title: 'Assignee', dataType: 'user', token: UserToken },
  { type: 'milestone', icon: 'clock', title: 'Milestone', unique: true, token: MilestoneToken },
  { type: 'weight', icon: 'weight', title: 'Weight', unique: true, token: GlFilteredSearchToken },
  {
    type: 'confidential',
    icon: 'eye-slash',
    title: 'Confidential',
    unique: true,
    token: GlFilteredSearchToken,
    options: [
      { icon: 'eye-slash', value: true, title: 'Yes' },
      { icon: 'eye', value: false, title: 'No' },
    ],
  },
];

const components = {
  GlFilteredSearch,
};

documentedStoriesOf('base|filtered-search', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return {
        tokens,
        value: [{ type: 'user', value: { data: 'beta', operator: '=' } }, 'raw text'],
      };
    },
    components,
    computed: {
      formattedValue() {
        return JSON.stringify(this.value);
      },
    },
    template: `
      <div>
        <pre>{{ formattedValue }}</pre>
        <gl-filtered-search :available-tokens="tokens" v-model="value" />
      </div>
    `,
  }));
