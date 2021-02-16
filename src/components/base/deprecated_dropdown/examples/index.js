import DropdownDefaultExample from './deprecated_dropdown.default.example.vue';
import DropdownDisabledItemExample from './deprecated_dropdown.disabled_item.example.vue';
import DropdownLinksExample from './deprecated_dropdown.links.example.vue';
import DropdownNoCaretExample from './deprecated_dropdown.no_caret.example.vue';
import DropdownSplitExample from './deprecated_dropdown.split.example.vue';
import DropdownWithDividerExample from './deprecated_dropdown.with_divider.example.vue';
import DropdownWithHeaderExample from './deprecated_dropdown.with_header.example.vue';
import DropdownWithSearchExample from './deprecated_dropdown.with_search.example.vue';

export default [
  {
    name: 'Dropdown',
    items: [
      {
        id: 'dropdown-default',
        name: 'Default',
        description: 'Default Dropdown',
        component: DropdownDefaultExample,
      },
      {
        id: 'dropdown-links',
        name: 'With Links',
        description: 'Dropdown with links as items',
        component: DropdownLinksExample,
      },
      {
        id: 'dropdown-with-divider',
        name: 'With Divider',
        description: 'Dropdown with divider',
        component: DropdownWithDividerExample,
      },
      {
        id: 'dropdown-with-disabled-item',
        name: 'With Disabled Item',
        description: 'Dropdown with disabled item',
        component: DropdownDisabledItemExample,
      },
      {
        id: 'dropdown-with-header',
        name: 'With Header',
        description: 'Dropdown with section header',
        component: DropdownWithHeaderExample,
      },
      {
        id: 'dropdown-with-search',
        name: 'With Search',
        description: 'Dropdown with search field',
        component: DropdownWithSearchExample,
      },
      {
        id: 'dropdown-no-caret',
        name: 'No Caret',
        description: 'Dropdown with no caret',
        component: DropdownNoCaretExample,
      },
      {
        id: 'dropdown-split',
        name: 'Split',
        description: 'Split Dropdown',
        component: DropdownSplitExample,
      },
    ],
  },
];
