// Component documentation
export { default as GlChartDocumentation } from '../components/charts/chart/chart.documentation';
export { default as GlAreaChartDocumentation } from '../components/charts/area/area.documentation';
export {
  default as GlChartLegendDocumentation,
} from '../components/charts/legend/legend.documentation';
export { default as GlLineChartDocumentation } from '../components/charts/line/line.documentation';
export {
  default as GlChartSeriesLabelDocumentation,
} from '../components/charts/series_label/series_label.documentation';
export {
  default as GlStackedColumnChartDocumentation,
} from '../components/charts/stacked_column/stacked_column.documentation';
export {
  default as GlSingleStatDocumentation,
} from '../components/charts/single_stat/single_stat.documentation';
export {
  default as GlChartTooltipDocumentation,
} from '../components/charts/tooltip/tooltip.documentation';
export { default as GlToastDocumentation } from '../components/base/toast/toast.documentation';
export { default as GlAvatarDocumentation } from '../components/base/avatar/avatar.documentation';
export {
  default as GlColumnChartDocumentation,
} from '../components/charts/column/column.documentation';
export {
  default as GlDiscreteScatterChartDocumentation,
} from '../components/charts/discrete_scatter/discrete_scatter.documentation';
export {
  default as GlSkeletonLoadingDocumentation,
} from '../components/base/skeleton_loading/skeleton_loading.documentation';
export { default as GlBadgeDocumentation } from '../components/base/badge/badge.documentation';
export { default as GlButtonDocumentation } from '../components/base/button/button.documentation';
export {
  default as GlNewButtonDocumentation,
} from '../components/base/new_button/new_button.documentation';
export { default as GlLinkDocumentation } from '../components/base/link/link.documentation';
export {
  default as GlLoadingIconDocumentation,
} from '../components/base/loading_icon/loading_icon.documentation';
export { default as GlModalDocumentation } from '../components/base/modal/modal.documentation';
export {
  default as GlPaginationDocumentation,
} from '../components/base/pagination/pagination.documentation';
export {
  default as GlPaginatedListDocumentation,
} from '../components/base/paginated_list/paginated_list.documentation';
export {
  default as GlPopoverDocumentation,
} from '../components/base/popover/popover.documentation';
export {
  default as GlProgressBarDocumentation,
} from '../components/base/progress_bar/progress_bar.documentation';
export {
  default as GlTooltipDocumentation,
} from '../components/base/tooltip/tooltip.documentation';
export {
  default as GlDashboardSkeletonDocumentation,
} from '../components/regions/dashboard_skeleton/dashboard_skeleton.documentation';
export {
  default as GlEmptyStateDocumentation,
} from '../components/regions/empty_state/empty_state.documentation';
export {
  default as GlFormInputDocumentation,
} from '../components/base/form/form_input/form_input.documentation';
export {
  default as GlFormTextareaDocumentation,
} from '../components/base/form/form_textarea/form_textarea.documentation';
export {
  default as GlFormGroupDocumentation,
} from '../components/base/form/form_group/form_group.documentation';
export {
  default as GlFormRadioDocumentation,
} from '../components/base/form/form_radio/form_radio.documentation';
export {
  default as GlFormSelectDocumentation,
} from '../components/base/form/form_select/form_select.documentation';
export {
  default as GlSearchBoxByTypeDocumentation,
} from '../components/base/search_box_by_type/search_box_by_type.documentation';
export {
  default as GlSearchBoxByClickDocumentation,
} from '../components/base/search_box_by_click/search_box_by_click.documentation';
export {
  default as GlDropdownItemDocumentation,
} from '../components/base/dropdown/dropdown_item.documentation';
export {
  default as GlDropdownHeaderDocumentation,
} from '../components/base/dropdown/dropdown_header.documentation';
export {
  default as GlDropdownDividerDocumentation,
} from '../components/base/dropdown/dropdown_divider.documentation';
export {
  default as GlDropdownDocumentation,
} from '../components/base/dropdown/dropdown.documentation';
export {
  default as GlNewDropdownDocumentation,
} from '../components/base/new_dropdown/new_dropdown.documentation';
export { default as GlTableDocumentation } from '../components/base/table/table.documentation';
export {
  default as GlBreadcrumbDocumentation,
} from '../components/base/breadcrumb/breadcrumb.documentation';
export {
  default as GlHeatmapDocumentation,
} from '../components/charts/heatmap/heatmap.documentation';
export { default as GlTabsDocumentation } from '../components/base/tabs/tabs/tabs.documentation';
export { default as GlTabDocumentation } from '../components/base/tabs/tab/tab.documentation';
export {
  default as GlButtonGroupDocumentation,
} from '../components/base/button_group/button_group.documentation';
export {
  default as GlFormCheckboxDocumentation,
} from '../components/base/form/form_checkbox/form_checkbox.documentation';
export {
  default as GlFriendlyWrapDocumentation,
} from '../components/base/friendly_wrap/friendly_wrap.documentation';
export { default as GlLabelDocumentation } from '../components/base/label/label.documentation';
export {
  default as GlDatepickerDocumentation,
} from '../components/base/datepicker/datepicker.documentation';
export { default as GlTokenDocumentation } from '../components/base/token/token.documentation';
export { default as GlToggleDocumentation } from '../components/base/toggle/toggle.documentation';
export {
  default as GlDaterangePickerDocumentation,
} from '../components/base/daterange_picker/daterange_picker.documentation';
export {
  default as GlSortingDocumentation,
} from '../components/base/sorting/sorting.documentation';
export {
  default as GlSortingItemDocumentation,
} from '../components/base/sorting/sorting_item.documentation';

export {
  default as GlIntersperseDocumentation,
} from '../components/base/intersperse/intersperse.documentation';

const componentList = Object.getPrototypeOf(module).exports;

export const getDocumentationFor = componentName => {
  const documentationKey = `${componentName}Documentation`;
  const documentationObject = componentList[documentationKey];
  if (!documentationObject) {
    throw new Error(
      `Could not find ${documentationKey} in documentation/components_documentation.js!`
    );
  }
  return documentationObject;
};
