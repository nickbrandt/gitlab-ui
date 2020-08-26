import DefaultSkeletonBasicExample from './default_skeleton.basic.example.vue';
import DefaultSkeletonCustomPropsBasicExample from './default_skeleton_custom_props.basic.example.vue';
import JobLogSkeletonBasicExample from './job_log_skeleton.basic.example.vue';
import CiHeaderSkeletonBasicExample from './ci_header_skeleton.basic.example.vue';
import IssueCardSkeletonBasicExample from './issue_card_skeleton.basic.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'default-skeleton-basic',
        name: 'Default',
        description: 'Default Skeleton',
        component: DefaultSkeletonBasicExample,
      },
      {
        id: 'default-skeleton-custom-width-basic',
        name: 'Default With Custom Props',
        description:
          'Default Skeleton With `preserve-aspect-ratio`, `lines`, `equal-width-lines`, `width` and `height` props set',
        component: DefaultSkeletonCustomPropsBasicExample,
      },
      {
        id: 'issue-card-skeleton-basic',
        name: 'Issue Board Card',
        description: 'Basic Issue Card Skeleton',
        component: IssueCardSkeletonBasicExample,
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
