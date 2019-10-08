import { shallowMount } from '@vue/test-utils';

import Avatar from '../../../components/base/avatar/avatar.vue';
import AvatarLabeled from '../../../components/base/avatar_labeled/avatar_labeled.vue';

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

  it('displays the avatar label', () => {
    const label = 'avatar label';

    vm.setProps({ label });

    expect(vm.find('.gl-avatar-labeled-label').text()).toEqual(label);
  });

  it('displays the avatar sub label', () => {
    const subLabel = 'avatar label';

    vm.setProps({ subLabel });

    expect(vm.find('.gl-avatar-labeled-sublabel').text()).toEqual(subLabel);
  });
});
