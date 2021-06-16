import examples from './examples';
import description from './tab.md';

export default {
  description,
  examples,
  bootstrapComponent: 'b-tab',
  followsDesignSystem: true,
  propsInfo: {
    queryParamValue: {
      additionalInfo:
        'Query string parameter value to use when `gl-tabs` `sync-active-tab-with-query-params` prop is set to `true`.',
      type: String,
    },
  },
};
