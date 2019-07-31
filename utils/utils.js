import { glThemes as glThemesVariable } from '../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

export function debounceByAnimationFrame(fn) {
  let requestId;

  return function debounced(...args) {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
    requestId = window.requestAnimationFrame(() => fn.apply(this, args));
  };
}

export const getGlThemes = () => glThemesVariable.split(',').map(glTheme => glTheme.trim());

export function hexToRgba(hex, opacity = 1) {
  const cleanHex = hex.replace('#', '');
  const rgb =
    cleanHex.length === 3
      ? cleanHex.split('').map(val => val + val)
      : cleanHex.match(/[\da-f]{2}/gi);
  const [r, g, b] = rgb.map(val => parseInt(val, 16));

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
