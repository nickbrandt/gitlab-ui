import BannerIntroducingIllustrationExample from './banner.introducing_illustration.example.vue';
import BannerPromotingExample from './banner.promoting.example.vue';
import BannerPromotingIllustrationExample from './banner.promoting_illustration.example.vue';

export default [
  {
    name: 'Introduction',
    items: [
      {
        id: 'banner-introduction',
        name: 'Basic Introduction',
        description: 'Basic Introduction Banner',
        component: BannerIntroducingIllustrationExample,
      },
    ],
  },
  {
    name: 'Promotion',
    items: [
      {
        id: 'banner-promotion-illustration',
        name: 'Promotion with Illustration',
        description: 'Promotion Banner with Illustration',
        component: BannerPromotingIllustrationExample,
      },
      {
        id: 'banner-promotion',
        name: 'Basic Promotion',
        description: 'Basic Promotion Banner',
        component: BannerPromotingExample,
      },
    ],
  },
];
