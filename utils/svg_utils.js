/* eslint-disable import/prefer-default-export */

export const makePathRect = (startX, startY, width, height) =>
  `M${startX},${startY}H${startX + width}V${startY + height}H${startX}Z`;
