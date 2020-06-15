<script>
export default {
  data() {
    return {
      // Generated with https://github.com/marak/Faker.js/
      users: [
        {
          avatar_url: 'https://picsum.photos/id/786/64/64',
          id: 1,
          name: 'Jett Kulas',
          username: '@Vidal_Hilpert',
        },
        {
          avatar_url: 'https://picsum.photos/id/823/64/64',
          id: 2,
          name: 'Blaze Thompson',
          username: '@Otto_Medhurst',
        },
        {
          avatar_url: 'https://picsum.photos/id/832/64/64',
          id: 3,
          name: 'Russel Rath',
          username: '@Joy_Sanford30',
        },
        {
          avatar_url: 'https://picsum.photos/id/838/64/64',
          id: 4,
          name: 'Lisandro Stiedemann',
          username: '@Consuelo_Durgan',
        },
        {
          avatar_url: 'https://picsum.photos/id/883/64/64',
          id: 5,
          name: 'Adela Champlin',
          username: '@Tiana_Shanahan',
        },
        {
          avatar_url: 'https://picsum.photos/id/1005/64/64',
          id: 6,
          name: 'Keith Rogahn',
          username: '@Jackeline.Moore',
        },
        {
          avatar_url: 'https://picsum.photos/id/1011/64/64',
          id: 7,
          name: 'Alek Lakin',
          username: '@Ike98',
        },
        {
          avatar_url: 'https://picsum.photos/id/1012/64/64',
          id: 8,
          name: 'Alek Bogan',
          username: '@Wilton.Dare',
        },
        {
          avatar_url: 'https://picsum.photos/id/1027/64/64',
          id: 9,
          name: 'Ismael Abbott',
          username: '@Junius.Lynch58',
        },
        {
          avatar_url: 'https://picsum.photos/id/1062/64/64',
          id: 10,
          name: 'Emil Bartell',
          username: '@Vergie.Brown78',
        },
        {
          avatar_url: 'https://picsum.photos/id/1074/64/64',
          id: 11,
          name: 'Foster Kutch',
          username: '@Lyda_Cummerata',
        },
        {
          avatar_url: 'https://picsum.photos/id/177/64/64',
          id: 12,
          name: 'Alexandra Schuppe',
          username: '@Jana_Fadel',
        },
        {
          avatar_url: 'https://picsum.photos/id/237/64/64',
          id: 13,
          name: 'Ervin Emard',
          username: '@Hayden24',
        },
        {
          avatar_url: 'https://picsum.photos/id/375/64/64',
          id: 14,
          name: 'Kailey Frami',
          username: '@Ima46',
        },
        {
          avatar_url: 'https://picsum.photos/id/550/64/64',
          id: 15,
          name: 'Xavier Prohaska',
          username: '@Theron15',
        },
        {
          avatar_url: 'https://picsum.photos/id/602/64/64',
          id: 16,
          name: 'Freddy Sanford',
          username: '@Luciano.Kuphal6',
        },
        {
          avatar_url: 'https://picsum.photos/id/64/64/64',
          id: 17,
          name: 'Alvah Rempel',
          username: '@Bo89',
        },
        {
          avatar_url: 'https://picsum.photos/id/65/64/64',
          id: 18,
          name: 'Gavin Mann',
          username: '@Cedrick56',
        },
        {
          avatar_url: 'https://picsum.photos/id/660/64/64',
          id: 19,
          name: 'Alexie Hagenes',
          username: '@Berry_Erdman',
        },
        {
          avatar_url: 'https://picsum.photos/id/996/64/64',
          id: 20,
          name: 'Cortez Wunsch',
          username: '@Kenyon.Crist3',
        },
      ],
      filteredUsers: [],
      loading: false,
      inputText: '',
      selectedTokens: [],
    };
  },
  computed: {
    emailIsValid() {
      return (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.inputText
        ) && !this.filteredUsers.length
      );
    },
  },
  methods: {
    handleTextInput(value) {
      this.inputText = value;

      if (this.inputText === '') {
        this.filteredUsers = this.users;

        return;
      }

      this.loading = true;
      this.filterUsers();
    },
    handleFocus() {
      this.loading = true;

      if (this.inputText !== '') {
        this.filterUsers();
      } else {
        setTimeout(() => {
          this.filteredUsers = this.users;

          this.loading = false;
        }, 500);
      }
    },
    filterUsers() {
      setTimeout(() => {
        this.filteredUsers = this.users.filter(user => {
          const searchQuery = this.inputText.toLowerCase();
          return (
            user.name.toLowerCase().includes(searchQuery) ||
            user.username.toLowerCase().includes(searchQuery)
          );
        });

        this.loading = false;
      }, 500);
    },
  },
};
</script>

<template>
  <gl-token-selector
    v-model="selectedTokens"
    :dropdown-items="filteredUsers"
    :loading="loading"
    :allow-user-defined-tokens="emailIsValid"
    @text-input="handleTextInput"
    @focus="handleFocus"
  >
    <template #token-content="{ token }">
      <gl-avatar v-if="token.avatar_url" :src="token.avatar_url" :size="16" />
      {{ token.name }}
    </template>
    <template #dropdown-item-content="{ dropdownItem }">
      <div class="gl-display-flex">
        <gl-avatar :src="dropdownItem.avatar_url" :size="32" />
        <div>
          <p class="gl-m-0">{{ dropdownItem.name }}</p>
          <p class="gl-m-0 gl-text-gray-700">{{ dropdownItem.username }}</p>
        </div>
      </div>
    </template>
    <template #user-defined-token-content="{ inputText: text }">
      Invite "{{ text }}" by email
    </template>
  </gl-token-selector>
</template>
