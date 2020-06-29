import DropdownDefaultExample from './new_dropdown.default.example.vue';
import DropdownLinksExample from './new_dropdown.links.example.vue';
import DropdownNoTextExample from './new_dropdown.no_text.example.vue';
import DropdownWithAvatarAndSecondaryText from './new_dropdown.with_avatar_and_secondary_text.example.vue';
import DropdownWithCheckedItemsExample from './new_dropdown.with_checked_items.example.vue';
import DropdownWithDividerExample from './new_dropdown.with_divider.example.vue';
import DropdownWithHeaderExample from './new_dropdown.with_header.example.vue';
import DropdownWithIcons from './new_dropdown.with_icons.example.vue';
import DropdownWithSectionHeadersExample from './new_dropdown.with_section_headers.example.vue';
import DropdownWithSearchExample from './new_dropdown.with_search.example.vue';
import DropdownSplitExample from './new_dropdown.split.example.vue';
import DropdownWithIconExample from './new_dropdown.with_icon.example.vue';
import DropdownWithIconAndTextExample from './new_dropdown.with_icon_and_text.example.vue';
import DropdownWithIconAndSplitExample from './new_dropdown.with_icon_and_split.example.vue';
import DropdownFullWidthExample from './new_dropdown.full_width.example.vue';

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
        id: 'new-dropdown-with-checked-items',
        name: 'With Checked Items',
        description: 'Dropdown with checked items',
        component: DropdownWithCheckedItemsExample,
      },
      {
        id: 'new-dropdown-with-avatar-and-secondary-text',
        name: 'With Avatar and Secondary Text',
        description: 'Dropdown with avatar and secondary text',
        component: DropdownWithAvatarAndSecondaryText,
      },
      {
        id: 'new-dropdown-with-icons',
        name: 'With Icons',
        description: 'Dropdown with icons',
        component: DropdownWithIcons,
      },
      {
        id: 'new-dropdown-with-section-headers',
        name: 'With Section Headers',
        description: 'Dropdown with section headers',
        component: DropdownWithSectionHeadersExample,
      },
      {
        id: 'new-dropdown-with-search',
        name: 'With Search',
        description: 'Dropdown with search field',
        component: DropdownWithSearchExample,
      },
      {
        id: 'new-dropdown-with-icon',
        name: 'With Icon',
        description: 'Icon Dropdown',
        component: DropdownWithIconExample,
      },
      {
        id: 'new-dropdown-with-icon-and-text',
        name: 'With Icon and Text',
        description: 'Icon Dropdown with text',
        component: DropdownWithIconAndTextExample,
      },
      {
        id: 'new-dropdown-with-icon-and-split',
        name: 'With Icon and Split',
        description: 'Icon Dropdown with split',
        component: DropdownWithIconAndSplitExample,
      },
      {
        id: 'new-dropdown-split',
        name: 'Split',
        description: 'Split Dropdown',
        component: DropdownSplitExample,
      },
      {
        id: 'new-dropdown-full-width',
        name: 'Full Width',
        description: 'Full Width Dropdown',
        component: DropdownFullWidthExample,
      },
      {
        id: 'new-dropdown-no-text',
        name: 'With No Button Text',
        description: 'Dropdown with no toggle button text set',
        component: DropdownNoTextExample,
      },
    ],
  },
];
