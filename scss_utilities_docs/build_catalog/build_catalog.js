const path = require('path');
const fs = require('fs');
const get = require('lodash/get');

const catalogMetadata = require('./catalog_metadata');
const readUtilitiesMap = require('./read_utilities_map');

const isColor = ({ type }) => type === 'SassColor';

const isSassString = ({ type }) => type === 'SassString';

const isSassNumber = ({ type }) => type === 'SassNumber';

const isSassList = ({ type }) => type === 'SassList';

const formatSassNumber = ({ value, unit }) => `${value}${unit}`;

const formatSassString = ({ value }) => value;

const formatSassColor = ({ value: { hex, r, g, b, a } }) => `${hex} / rgba(${r},${g},${b},${a})`;

const formatSassList = ({ value, separator }) =>
  value
    // eslint-disable-next-line no-use-before-define
    .map(segment => formatPropertyValue(segment))
    .join(separator);

const formatPropertyValue = value => {
  if (isSassNumber(value)) {
    return formatSassNumber(value);
  }

  if (isSassString(value)) {
    return formatSassString(value);
  }

  if (isSassList(value)) {
    return formatSassList(value);
  }

  if (isColor(value)) {
    return formatSassColor(value);
  }

  return value;
};

const formatUtilityProperty = (propName, propValue) =>
  `\`${propName}: ${formatPropertyValue(propValue)};\``;

const formatUtilityProperties = props =>
  Object.keys(props)
    .map(propName => formatUtilityProperty(propName, props[propName]))
    .join('<br>');

const formatUtilityName = utilityName => `\`${utilityName}\``;

const generateUtilityRow = (utilityName, props) =>
  `|${formatUtilityName(utilityName)}| ${formatUtilityProperties(props)} |`;

const generateUtilityGroupTableBody = (utilities, displaySettings) => {
  const utilityNames = Object.keys(utilities);
  const maxRows = get(displaySettings, 'maxRows', utilityNames.length);

  return utilityNames
    .slice(0, maxRows)
    .map(utilityName => generateUtilityRow(utilityName, utilities[utilityName].value))
    .join('\n');
};

const generateUtilityGroupTableHeader = () =>
  `
| **Utility name** | **Properties** |
|------------------|----------------|
`.trim();

const generateUtilityGroupTable = (utilities, displaySettings) => `
  ${generateUtilityGroupTableHeader()}
  ${generateUtilityGroupTableBody(utilities, displaySettings)}
`;

const formatUtilityGroupTitle = title => `### ${title}`;

const generateUtilityGroupDocs = (groupTitle, utilities, displaySettings) => `
  ${formatUtilityGroupTitle(groupTitle)}
  ${generateUtilityGroupTable(utilities, displaySettings)}
`;

const generateDocs = () => {
  const utilitiesMap = readUtilitiesMap();

  return Object.keys(catalogMetadata)
    .map(catalogGroup => {
      const { props, displaySettings } = catalogMetadata[catalogGroup];
      const groupUtilities = utilitiesMap.getUtilitiesWithProperties(props);

      return generateUtilityGroupDocs(catalogGroup, groupUtilities, displaySettings);
    })
    .join('\n');
};

fs.writeFileSync(path.resolve(__dirname, '..', 'utilities_catalog.md'), generateDocs());
