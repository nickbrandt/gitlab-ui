import description from './chart_skeleton.md';
import GlChartSkeleton from './chart_skeleton.vue';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    ...GlChartSkeleton.props,
  },
};
