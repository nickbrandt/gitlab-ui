/**
 * As of %12.10 all annotations are added as a decorations
 * by piggybacking a scatter series. The series should
 * have 'annotations' as name for the annotation tooltips
 * to work.
 *
 * More info here https://gitlab.com/gitlab-org/gitlab/-/merge_requests/28825
 *
 */
export const ANNOTATIONS_SERIES_NAME = 'annotations';
/**
 * Annotations have a line (markLine) and an arrow (markPoint).
 * When the markPoint is hovered, a tooltip is displayed to
 * show the annotation description.
 *
 * All markPoints have this component type
 */
export const ANNOTATIONS_COMPONENT_TYPE = 'markPoint';

/**
 * This is so that the mouse doesn't go over the
 * tooltip and call mouseout which will hide the
 * tooltip.
 */
export const ANNOTATION_TOOLTIP_TOP_OFFSET = 10;

/**
 * This is a slight offset that gets applied to the left
 * of the chart tooltips to ensure a correct position.
 */
export const TOOLTIP_LEFT_OFFSET = 2;

/**
 * This is an offset that gets applied between the mouse
 * cursor and the left of the chart data tooltips to provide
 * some spacing.
 */
export const DATA_TOOLTIP_LEFT_OFFSET = 10;

/**
 * These are the accepted values for the layout prop
 * of the chart legend component
 */
export const LEGEND_LAYOUT_INLINE = 'inline';
export const LEGEND_LAYOUT_TABLE = 'table';

/**
 * Default values for the chart legend field labels
 */
export const LEGEND_AVERAGE_TEXT = 'Avg';
export const LEGEND_CURRENT_TEXT = 'Current';
export const LEGEND_MIN_TEXT = 'Min';
export const LEGEND_MAX_TEXT = 'Max';

/**
 * These arrow symbols are used as markPoints under the annotations lines
 * within area and line charts. This icon doesn't exist in the svg
 * library yet. The below issue is to track the progress of the svg icon
 * https://gitlab.com/gitlab-org/gitlab-svgs/-/issues/118
 */
export const arrowSymbol = 'path://m5 229 5 8h-10z';

/**
 * These are used to test varying lengths of series names
 */
export const SERIES_NAME_SHORT = 'Series ';
export const SERIES_NAME_LONG =
  'Series name long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt interdum sapien ut blandit. Nulla fermentum nisi id euismod vulputate. END';
export const SERIES_NAME_LONG_WITHOUT_SPACES =
  'Series_name_long._Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit._Sed_tincidunt_interdum_sapien_ut_blandit._Nulla_fermentum_nisi_id_euismod_vulputate._END';
