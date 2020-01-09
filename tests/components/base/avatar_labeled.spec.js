import { shallowMount } from '@vue/test-utils';

import Avatar from '../../../src/components/base/avatar/avatar.vue';
import AvatarLabeled from '../../../src/components/base/avatar_labeled/avatar_labeled.vue';

describe('avatar labeled', () => {
  let vm;

  beforeEach(() => {
    vm = shallowMount(AvatarLabeled, {
      propsData: {
        label: '',
      },
    });
  });
  afterEach(() => vm.destroy());

  it('sets avatar alt attribute to an empty string', () => {
    const altText = 'alt text';

    vm.setProps({ alt: altText });

    expect(vm.find(Avatar).props('alt')).not.toEqual(altText);
  });

  it('displays the avatar label', async () => {
    const label = 'avatar label';

    vm.setProps({ label });

    await vm.vm.$nextTick();
    expect(vm.find('.gl-avatar-labeled-label').text()).toEqual(label);
  });

  it('displays the avatar sub label', async () => {
    const subLabel = 'avatar label';

    vm.setProps({ subLabel });

    await vm.vm.$nextTick();
    expect(vm.find('.gl-avatar-labeled-sublabel').text()).toEqual(subLabel);
  });
});
