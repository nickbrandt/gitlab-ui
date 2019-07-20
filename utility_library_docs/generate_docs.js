const path = require('path');
const fs = require('fs');
const sassExtract = require('sass-extract');

const isArray = require('lodash/isArray');
const has = require('lodash/has')

const isColor = value => has(value, 'hex');

const formatColorValue = (colorDefinition) => colorDefinition.hex;

const formatListValue = value =>
  value
    .map(({ value: segment }) => (isColor(segment) ? formatColorValue(segment) : segment))
    .join(' ');

const formatPropertyValue = value => {
  if(isArray(value)) {
    return formatListValue(value);
  } if(isColor(value)) {
    return formatColorValue(value);
  }

  return value;
}

const formatUtilityProperty = (propName, propValue) =>
  `\`${propName}: ${formatPropertyValue(propValue)};\``;

const formatUtilityProperties = props =>
  Object.keys(props).map(propName =>
    formatUtilityProperty(propName, props[propName].value)
  ).join('<br>')

const formatUtilityName = utilityName => `\`${utilityName}\``;

const generateUtilityDocs = (utilityName, props) =>
`|${formatUtilityName(utilityName)}| ${formatUtilityProperties(props)} |`

const generateUtilitiesDocs = utilities =>
  Object.keys(utilities).map(utilityName =>
    generateUtilityDocs(utilityName, utilities[utilityName].value)
  ).join('\n')


const generateDocsHeader = () => `
| Utility name | Properties |
|--------------|------------|
`.trim()

const generateDocs = (utilities) => `
${generateDocsHeader()}
${generateUtilitiesDocs(utilities)}
`.trim();

const processedSass = sassExtract.renderSync({
  file: path.resolve(__dirname, 'index.scss')
});

const docs = generateDocs(processedSass.vars.global.$utilities.value);

fs.writeFileSync(path.resolve(__dirname, 'utilities_docs.md'), docs);
