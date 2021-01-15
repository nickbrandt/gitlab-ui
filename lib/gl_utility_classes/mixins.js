const postcss = require('postcss');
const { map, flatMap } = require('lodash');

const createDeclarations = (properties, value) =>
  properties.map(prop => postcss.decl({ prop, value }));

const createResponsiveDeclarations = (breakpointRule, properties, value) =>
  postcss.atRule({
    name: 'media',
    params: breakpointRule,
    nodes: createDeclarations(properties, value),
  });

const createMixinsForValue = ({ value, baseName, valueName, properties, breakpoints }) => {
  const baseMixin = postcss.atRule({
    name: 'mixin',
    params: `${baseName}-${valueName}`,
    nodes: createDeclarations(properties, value),
  });
  const responsiveMixins = map(breakpoints || {}, (breakpointRule, breakpointName) =>
    postcss.atRule({
      name: 'mixin',
      params: `${baseName}-${breakpointName}-${valueName}`,
      nodes: [createResponsiveDeclarations(breakpointRule, properties, value)],
    })
  );

  return [baseMixin, ...responsiveMixins];
};

const createMixinsForProperty = ({ prefix, prop, config }) => {
  const baseName = `${prefix}-${prop}`;
  const { values } = config;

  return flatMap(values, (value, valueName) =>
    createMixinsForValue({ value, valueName, baseName, ...config })
  );
};

const createUtilityMixins = ({ utilities, prefix }) =>
  postcss
    .root()
    .append(
      flatMap(utilities, (config, prop) => createMixinsForProperty({ prefix, prop, config }))
    );

module.exports = createUtilityMixins;
