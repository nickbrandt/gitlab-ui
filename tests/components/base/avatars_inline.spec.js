import { shallowMount } from '@vue/test-utils';

import Avatar from '../../../src/components/base/avatar/avatar.vue';
import AvatarsInline from '../../../src/components/base/avatars_inline/avatars_inline.vue';

describe('avatars inline', () => {
  let wrapper;
  const avatars = [{ src: 'avatar 1' }, { src: 'avatar 2' }, { src: 'avatar 3' }];

  const buildWrapper = (propsData = {}) => {
    wrapper = shallowMount(AvatarsInline, {
      propsData,
    });
  };

  afterEach(() => wrapper.destroy());

  it('displays all avatars when component is not collapsed', () => {
    buildWrapper({ avatars, maxVisible: 1, avatarSize: 24, collapsed: false });

    expect(wrapper.findAll(Avatar).length).toBe(avatars.length);
  });

  it('adds collapsed class selector when collapsed=true', () => {
    buildWrapper({ avatars, maxVisible: 2, avatarSize: 24, collapsed: true });

    expect(wrapper.classes()).toContain('collapsed');
  });

  describe('when component is collapsed and maxVisible is the number of avatars', () => {
    beforeEach(() => {
      buildWrapper({ avatars, maxVisible: avatars.length, avatarSize: 24, collapsed: true });
    });

    it('displays all avatars', () => {
      expect(wrapper.findAll(Avatar).length).toBe(avatars.length);
    });
  });

  it('hides all additional avatars beyond maxVisible', () => {
    buildWrapper({ avatars, maxVisible: avatars.length - 1, avatarSize: 24, collapsed: true });

    expect(wrapper.findAll(Avatar).length).toBe(2);
  });

  it('adds md class selector to badge when avatar size is 24', () => {
    buildWrapper({ avatars, maxVisible: 1, avatarSize: 24, collapsed: true });

    expect(wrapper.find('.gl-avatars-inline-badge').classes()).toContain('md');
  });

  it('adds lg class selector to badge when avatar size is 32', () => {
    buildWrapper({ avatars, maxVisible: 1, avatarSize: 32, collapsed: true });

    expect(wrapper.find('.gl-avatars-inline-badge').classes()).toContain('lg');
  });
});
