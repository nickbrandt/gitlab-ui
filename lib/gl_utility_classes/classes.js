const postcss = require('postcss');
const { flatMap } = require('lodash');

const createDeclarations = (properties, value, important = false) =>
  properties.map(prop => postcss.decl({ prop, value, important }));

const responsiveDeclarations = (breakpointRule, declarations) => [
  postcss.atRule({
    name: 'media',
    params: breakpointRule,
    nodes: declarations,
  }),
];

const createRule = ({ selector, properties, value, breakpointRule }) => {
  const decls = createDeclarations(properties, value);
  const importantDecls = createDeclarations(properties, value, true);

  return [
    postcss.rule({
      selector,
      nodes: breakpointRule ? responsiveDeclarations(breakpointRule, decls) : decls,
    }),
    postcss.rule({
      selector: `${selector}\\!`,
      nodes: breakpointRule
        ? responsiveDeclarations(breakpointRule, importantDecls)
        : importantDecls,
    }),
  ];
};

const createClassesForValue = ({ value, baseName, valueName, properties, breakpoints }) => {
  return [
    // base utility
    ...createRule({
      selector: `.${baseName}-${valueName}`,
      properties,
      value,
    }),
    // responsive utilities
    ...flatMap(breakpoints || {}, (breakpointRule, breakpointName) =>
      createRule({
        selector: `.${baseName}-${breakpointName}-${valueName}`,
        properties,
        value,
        breakpointRule,
      })
    ),
  ];
};

const createClassesForProperty = ({ prefix, config, prop }) => {
  const baseName = `${prefix}-${prop}`;
  const { values } = config;

  return flatMap(values, (value, valueName) =>
    createClassesForValue({ value, valueName, baseName, ...config })
  );
};

const createUtilityClasses = ({ utilities, prefix }) =>
  postcss
    .root()
    .append(
      flatMap(utilities, (config, prop) => createClassesForProperty({ prefix, prop, config }))
    );

module.exports = createUtilityClasses;
