import JobLogSkeletonBasicExample from './job_log_skeleton.basic.example.vue';
import CiHeaderSkeletonBasicExample from './ci_header_skeleton.basic.example.vue';
import PipelineRowSkeletonBasicExample from './pipeline_row_skeleton.basic.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'pipeline-row-skeleton-basic',
        name: 'Pipeline Row',
        description: 'Basic Pipeline Row Skeleton',
        component: PipelineRowSkeletonBasicExample,
      },
      {
        id: 'job-log-skeleton-basic',
        name: 'Job Log',
        description: 'Basic Job Log Skeleton',
        component: JobLogSkeletonBasicExample,
      },
      {
        id: 'ci-header-skeleton-basic',
        name: 'CI Header',
        description: 'Basic CI Header Skeleton',
        component: CiHeaderSkeletonBasicExample,
      },
    ],
  },
];
