/**
 * Returns current base URL
 */
export function getBaseURL() {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
}

/**
 * Returns true if url is an absolute or root-relative URL
 *
 * @param {String} url
 */
export function isAbsoluteOrRootRelative(url) {
  return /^(https?:)?\//.test(url);
}

/**
 * Returns true if url is a fragment URL
 *
 * @param {String} url
 */
export function isFragment(url) {
  return /^#/.test(url);
}
/**
 * Checks if the provided URL is a safe URL (absolute http(s) or root-relative URL)
 *
 * @param {String} url that will be checked
 * @returns {Boolean}
 */
export function isSafeURL(url) {
  if (!isAbsoluteOrRootRelative(url) && !isFragment(url)) {
    return false;
  }

  try {
    const parsedUrl = new URL(url, getBaseURL());
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
}
