import svgs from '@gitlab/svgs/dist/icons.svg';

/**
 * Retrieve SVG icon path content from @gitlab/svg sprite icons
 * @param {String} name
 */
export const getSvgIconPathContent = name =>
  new DOMParser()
    .parseFromString(svgs, 'text/xml')
    .querySelector(`#${name} path`)
    .getAttribute('d');

export const getSvgEchartsPath = name => `path://${getSvgIconPathContent(name)}`;

export const makePathRect = (startX, startY, width, height) =>
  `M${startX},${startY}H${startX + width}V${startY + height}H${startX}Z`;
