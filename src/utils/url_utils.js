const he = require('he');

/**
 * Returns current base URL
 */
export function getBaseURL() {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
}

export function isSafeURL(url) {
  if (!url) {
    return false;
  }
  const decodedUrl = he.unescape(url);
  try {
    const parsedUrl = new URL(decodedUrl, getBaseURL());
    return ['http:', 'https:', 'mailto:', 'ftp:'].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
}
