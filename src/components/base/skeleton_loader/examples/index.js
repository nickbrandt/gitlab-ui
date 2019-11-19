import JobLogSkeletonBasicExample from './job_log_skeleton.basic.example.vue';
import CiHeaderSkeletonBasicExample from './ci_header_skeleton.basic.example.vue';
import IssueCardSkeletonBasicExample from './issue_card_skeleton.basic.example.vue';

export default [
  {
    name: 'Basic',
    items: [
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
