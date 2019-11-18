import DropdownDefaultExample from './new_dropdown.default.example.vue';
import DropdownLinksExample from './new_dropdown.links.example.vue';
import DropdownWithDividerExample from './new_dropdown.with_divider.example.vue';
import DropdownWithHeaderExample from './new_dropdown.with_header.example.vue';
import DropdownWithSearchExample from './new_dropdown.with_search.example.vue';
import DropdownSplitExample from './new_dropdown.split.example.vue';
import DropdownWithIconExample from './dropdown.with_icon.example.vue';
import DropdownWithIconAndTextExample from './dropdown.with_icon_and_text.example.vue';

export default [
  {
    name: 'Dropdown',
    items: [
      {
        id: 'new-dropdown-default',
        name: 'Default',
        description: 'Default Dropdown',
        component: DropdownDefaultExample,
      },
      {
        id: 'new-dropdown-links',
        name: 'With Links',
        description: 'Dropdown with links as items',
        component: DropdownLinksExample,
      },
      {
        id: 'new-dropdown-with-divider',
        name: 'With Divider',
        description: 'Dropdown with divider',
        component: DropdownWithDividerExample,
      },
      {
        id: 'new-dropdown-with-header',
        name: 'With Header',
        description: 'Dropdown with section header',
        component: DropdownWithHeaderExample,
      },
      {
        id: 'new-dropdown-with-search',
        name: 'With Search',
        description: 'Dropdown with search field',
        component: DropdownWithSearchExample,
      },
      {
        id: 'dropdown-with-icon',
        name: 'With Icon',
        description: 'Icon Dropdown',
        component: DropdownWithIconExample,
      },
      {
        id: 'dropdown-with-icon-and-text',
        name: 'With Icon and Text',
        description: 'Icon Dropdown with text',
        component: DropdownWithIconAndTextExample,
      },
      {
        id: 'new-dropdown-split',
        name: 'Split',
        description: 'Split Dropdown',
        component: DropdownSplitExample,
      },
    ],
  },
];
