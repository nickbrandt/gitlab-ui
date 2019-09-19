import {
  glThemes as glThemesVariable,
  glIconSizes as glIconSizesVariable,
} from '../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

function appendDefaultOption(options) {
  return Object.assign({}, options, {
    default: '',
  });
}

export const glThemes = glThemesVariable.split(',').map(glTheme => glTheme.trim());

export const variantOptions = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  light: 'light',
  dark: 'dark',
};

export const targetOptions = ['_self', '_blank', '_parent', '_top', null];

export const sizeOptions = {
  default: null,
  sm: 'sm',
  lg: 'lg',
};

export const labelSizeOptions = {
  default: null,
  sm: 'sm',
};

export const labelColorOptions = {
  dark: 'dark',
  light: 'light',
};

export const avatarSizeOptions = [96, 64, 48, 32, 24, 16];

export const avatarShapeOptions = {
  circle: 'circle',
  rect: 'rect',
};

export const formStateOptions = {
  default: null,
  valid: 'valid',
  invalid: 'invalid',
};

export const buttonVariantOptions = {
  default: null,
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  'outline-info': 'outline-info',
  'outline-success': 'outline-success',
  'outline-warning': 'outline-warning',
  'outline-danger': 'outline-danger',
};

export const newButtonCategoryOptions = {
  tertiary: 'tertiary',
  primary: 'primary',
  secondary: 'secondary',
};

export const newButtonVariantOptions = {
  default: 'default',
  dashed: 'dashed',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  link: 'link',
};

export const newDropdownVariantOptions = {
  default: 'default',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export const newButtonSizeOptions = {
  small: 'small',
  medium: 'medium',
};

export const newButtonSizeOptionsMap = {
  small: 'sm',
  medium: 'md',
};

export const dropdownIconSizeOptions = [12, 16];

// size options all have corresponding styles (e.g. .s12 defined in icon.scss)
export const iconSizeOptions = glIconSizesVariable.split(' ').map(Number);

export const triggerVariantOptions = {
  click: 'click',
  hover: 'hover',
  focus: 'focus',
};

export const tooltipPlacements = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
};

export const popoverPlacements = {
  top: 'top',
  topleft: 'topleft',
  topright: 'topright',
  right: 'right',
  righttop: 'righttop',
  rightbottom: 'rightbottom',
  bottom: 'bottom',
  bottomleft: 'bottomleft',
  bottomright: 'bottomright',
  left: 'left',
  lefttop: 'lefttop',
  leftbottom: 'leftbottom',
};

export const columnOptions = {
  stacked: 'stacked',
  tiled: 'tiled',
};

export const alignOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
  fill: 'fill',
};

export const alertVariantOptions = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  tip: 'tip',
};

export const alertButtonVariantMap = {
  success: { primary: 'success', secondary: 'success' },
  warning: { primary: 'warning', secondary: 'warning' },
  danger: { primary: 'danger', secondary: 'danger' },
  info: { primary: 'info', secondary: 'info' },
  tip: { primary: 'info', secondary: 'default' },
};

export const alertVariantIconMap = {
  success: 'check-circle',
  warning: 'warning',
  danger: 'error',
  info: 'information-o',
  tip: 'bulb',
};

export const colorThemes = {
  indigo: 'theme-indigo-900',
  'light-indigo': 'theme-indigo-700',
  blue: 'theme-blue-900',
  'light-blue': 'theme-blue-700',
  green: 'theme-green-900',
  'light-green': 'theme-green-700',
  red: 'theme-red-900',
  'light-red': 'theme-red-700',
  dark: 'gray-900',
  light: 'gray-700',
};

export const modalButtonDefaults = {
  actionPrimary: {
    variant: 'success',
  },
  actionSecondary: {
    variant: 'outline-warning',
  },
  actionCancel: {
    variant: 'secondary',
  },
};

export const resizeDebounceTime = 200;
export const throttleDuration = 2000;

export const variantOptionsWithNoDefault = appendDefaultOption(variantOptions);
export const sizeOptionsWithNoDefault = appendDefaultOption(sizeOptions);

// Datetime constants
export const defaultDateFormat = 'YYYY-MM-DD';

export const bannerVariants = ['promotion', 'introduction'];

export const maxZIndex = 10;
