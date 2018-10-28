import * as description from './pagination.md';
import { default as glPaginationExamples } from './examples';

export default {
  description,
  examples: glPaginationExamples,
  bootstrapComponent: 'b-pagination',
  propsInfo: {
    limits: {
      additionalInfo: 'The object must contain the xs, sm, md and default keys',
    },
  },
};
