import { shallowMount } from '@vue/test-utils';

import Avatar from '../avatar/avatar.vue';
import AvatarLabeled from './avatar_labeled.vue';

describe('avatar labeled', () => {
  let wrapper;

  const label = 'avatar label';
  const subLabel = 'avatar label';

  const buildWrapper = (propsData, slots) => {
    wrapper = shallowMount(AvatarLabeled, {
      propsData: {
        label: '',
        ...propsData,
      },
      slots,
    });
  };

  afterEach(() => wrapper.destroy());

  it('sets avatar alt attribute to an empty string', () => {
    const altText = 'alt text';

    buildWrapper({ alt: altText });

    expect(wrapper.find(Avatar).props('alt')).not.toEqual(altText);
  });

  it('displays the avatar label', () => {
    buildWrapper({ label });

    expect(wrapper.find('.gl-avatar-labeled-label').text()).toEqual(label);
  });

  it('displays the avatar sub label', () => {
    buildWrapper({ subLabel });

    expect(wrapper.find('.gl-avatar-labeled-sublabel').text()).toEqual(subLabel);
  });

  it('displays `meta` slot', () => {
    buildWrapper(
      { label, subLabel },
      { meta: '<span data-testid="user-meta" class="gl-p-1">Foo Bar</span>' }
    );

    expect(wrapper.find('[data-testid="user-meta"]').exists()).toBe(true);
  });
});
