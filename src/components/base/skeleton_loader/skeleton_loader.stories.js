import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './skeleton_loader.md';
import { GlSkeletonLoader } from '../../../../index';

const components = {
  GlSkeletonLoader,
};

documentedStoriesOf('base|skeleton-loader', readme).add('default', () => ({
  props: {},
  components,
  template: `
    <div style="background: #fff; border: 1px solid #dfdfdf; box-shadow: 0 1px 2px rgba(0,0,0,0.1); width: 375px; height: 140px; padding: 1rem; border-radius: 0.25rem;">
      <div style="width: 327px; height: 104px;">
        <gl-skeleton-loader :width="327" :height="104">
          <rect width="276" height="16" rx="4"/>
          <rect y="18" width="237" height="16" rx="4"/>
          <rect y="41" width="118" height="16" rx="8"/>
          <rect x="122" y="41" width="130" height="16" rx="8"/>
          <rect y="61" width="106" height="16" rx="8"/>
          <rect x="110" y="61" width="56" height="16" rx="8"/>
          <rect x="256" y="41" width="71" height="16" rx="8"/>
          <rect y="88" width="38" height="16" rx="4"/>
        </gl-skeleton-loader >
      </div>
    </div>`,
}));
