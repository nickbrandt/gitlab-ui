import BasicExample from './broadcast_message.basic.example.vue';
import ThemesExample from './broadcast_message.themes.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'broadcast-message-basic-example',
        name: 'Basic',
        component: BasicExample,
      },
      {
        id: 'broadcast-message-themes-example',
        name: 'Themes',
        component: ThemesExample,
      },
    ],
  },
];
