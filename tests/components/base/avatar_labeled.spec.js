import { shallowMount } from '@vue/test-utils';

import Avatar from '../../../src/components/base/avatar/avatar.vue';
import AvatarLabeled from '../../../src/components/base/avatar_labeled/avatar_labeled.vue';

describe('avatar labeled', () => {
  let wrapper;

  const buildWrapper = propsData => {
    wrapper = shallowMount(AvatarLabeled, {
      propsData: {
        label: '',
        ...propsData,
      },
    });
  };

  afterEach(() => wrapper.destroy());

  it('sets avatar alt attribute to an empty string', () => {
    const altText = 'alt text';

    buildWrapper({ alt: altText });

    expect(wrapper.find(Avatar).props('alt')).not.toEqual(altText);
  });

  it('displays the avatar label', () => {
    const label = 'avatar label';

    buildWrapper({ label });

    expect(wrapper.find('.gl-avatar-labeled-label').text()).toEqual(label);
  });

  it('displays the avatar sub label', () => {
    const subLabel = 'avatar label';

    buildWrapper({ subLabel });

    expect(wrapper.find('.gl-avatar-labeled-sublabel').text()).toEqual(subLabel);
  });
});
