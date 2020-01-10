import description from './filtered_search_suggestion.md';

export default {
  description,
  bootstrapComponent: 'b-dropdown-item',
  propsInfo: {
    value: {
      additionalInfo: 'Value which will be emitted if this suggestion will be selected in list',
    },
  },
};
