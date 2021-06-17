<script>
const fakeUsers = [
  { id: 1, name: 'User Alpha', username: 'alpha' },
  { id: 2, name: 'User Beta', username: 'beta' },
  { id: 3, name: 'User Gamma', username: 'gamma' },
  { id: 4, name: 'User Delta', username: 'delta' },
  { id: 5, name: 'User Epsilon', username: 'epsilon' },
];

const UserToken = {
  props: ['value', 'active', 'config'],
  inheritAttrs: false,
  data() {
    return {
      users: fakeUsers,
      selectedUsernames: this.value.data ? this.value.data.split(',') : [],
      activeUser: null,
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => user.username.includes(this.value.data));
    },
    selectedUsers() {
      return this.config.multiSelect
        ? this.users.filter((user) => this.selectedUsernames.includes(user.username))
        : this.users.filter((user) => user.username === this.activeUser);
    },
  },
  methods: {
    loadView() {
      this.activeUser = fakeUsers.find((u) => u.username === this.value.data);
    },
    loadSuggestions() {
      this.users = fakeUsers;
    },
    handleSelect(username) {
      if (!this.config.multiSelect) {
        return;
      }

      if (this.selectedUsernames.includes(username)) {
        this.selectedUsernames = this.selectedUsernames.filter((user) => user !== username);
      } else {
        this.selectedUsernames.push(username);
      }
    },
    isLastUser(index) {
      return index === this.selectedUsers.length - 1;
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'value.data': function () {
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
      :multi-select-values="selectedUsernames"
      @select="handleSelect"
    >
    <template #view="{ inputValue }">
      <template v-for="(user, index) in selectedUsers">
        <gl-avatar :size="16" :entity-name="user.username" shape="circle" />
        {{ user.name }}
        <span v-if="!isLastUser(index)" class="gl-mx-2">,&nbsp;</span>
      </template>
    </template>
    <template #suggestions>
      <gl-filtered-search-suggestion :key="user.id" v-for="user in filteredUsers" :value="user.username">
        <div class="gl-display-flex gl-align-items-center">
          <gl-icon
            v-if="config.multiSelect"
            name="check"
            class="gl-mr-3 gl-text-gray-700"
            :class="{ 'gl-visibility-hidden': !selectedUsernames.includes(user.username) }"
          />
          <gl-avatar :size="32" :entity-name="user.username" />
          <div>
            <p class="gl-m-0">{{ user.name }}</p>
            <p class="gl-m-0">@{{ user.username }}</p>
          </div>
        </div>
      </gl-filtered-search-suggestion>
    </template>
    </gl-filtered-search-token>
  `,
};

const tokens = [
  {
    type: 'assignee',
    icon: 'user',
    title: 'Assignee',
    token: UserToken,
    operators: [
      { value: '=', description: 'is', default: 'true' },
      { value: '!=', description: 'is not one of' },
      { value: '||', description: 'is one of' },
    ],
    multiSelect: true,
  },
];

export default {
  data() {
    return {
      tokens,
      value: [{ type: 'assignee', value: { data: 'alpha,beta', operator: '=' } }],
    };
  },
};
</script>

<template>
  <gl-filtered-search v-model="value" :available-tokens="tokens" :show-friendly-text="true" />
</template>
