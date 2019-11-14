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
  let frameId = null;

  return (...args) => {
    if (frameId) {
      return;
    }

    frameId = window.requestAnimationFrame(() => {
      fn(...args);
      frameId = null;
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

export function uid() {
  return Math.random()
    .toString(36)
    .substring(2);
}
