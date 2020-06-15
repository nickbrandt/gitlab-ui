import UserDefinedTokensExample from './token_selector.user_defined_tokens.example.vue';
import UsersExample from './token_selector.users.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'token-selector-user-defined-tokens',
        name: 'User Defined Tokens',
        description: 'User Defined Tokens',
        component: UserDefinedTokensExample,
      },
      {
        id: 'token-selector-users',
        name: 'Users',
        description: 'Users Token Selector',
        component: UsersExample,
      },
    ],
  },
];
