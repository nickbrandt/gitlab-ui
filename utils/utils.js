export function debounceByAnimationFrame(fn) {
  let requestId;

  return function debounced(...args) {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
    requestId = window.requestAnimationFrame(() => fn.apply(this, args));
  };
}

export function throttle(fn) {
  let working = false;

  return (...args) => {
    if (working) {
      return;
    }

    working = true;
    fn(...args);

    window.requestAnimationFrame(() => {
      working = false;
    });
  };
}

export function hexToRgba(hex, opacity = 1) {
  const cleanHex = hex.replace('#', '');
  const rgb =
    cleanHex.length === 3
      ? cleanHex.split('').map(val => val + val)
      : cleanHex.match(/[\da-f]{2}/gi);
  const [r, g, b] = rgb.map(val => parseInt(val, 16));

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
