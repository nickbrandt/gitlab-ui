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
 * These arrow symbols are used as markPoints under the annotations lines
 * within area and line charts. This icon doesn't exist in the svg
 * library yet. The below issue is to track the progress of the svg icon
 * https://gitlab.com/gitlab-org/gitlab-svgs/-/issues/118
 */
export const arrowSymbol = 'path://m5 229 5 8h-10z';
