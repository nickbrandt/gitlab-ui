export const getBaseURL = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
};

export const isSafeURL = url => {
  try {
    const parsedUrl = new URL(url, getBaseURL());
    return ['http:', 'https:', 'mailto:', 'ftp:'].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
};

const transform = el => {
  el.href = isSafeURL(el.href) ? el.href : 'about:blank';
};

const SafeLinkDirective = {
  bind: transform,
  inserted: transform,
  update: transform,
};

export default SafeLinkDirective;
