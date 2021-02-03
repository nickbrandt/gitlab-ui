import { shallowMount } from '@vue/test-utils';

import Avatar from '../avatar/avatar.vue';
import GlLink from '../link/link.vue';
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

  describe('with label links', () => {
    beforeEach(() => {
      buildWrapper({ label, subLabel, labelLink: 'http://label', subLabelLink: 'http://subLabel' });
    });

    it('displays the avatar label link', () => {
      const labelLink = wrapper.findAll(GlLink).at(0);
      expect(labelLink.text()).toBe(label);
      expect(labelLink.attributes('href')).toBe('http://label');
    });

    it('displays the avatar sub-label link', () => {
      const subLabelLink = wrapper.findAll(GlLink).at(1);
      expect(subLabelLink.text()).toBe(subLabel);
      expect(subLabelLink.attributes('href')).toBe('http://subLabel');
    });
  });

  describe('without label links', () => {
    beforeEach(() => {
      buildWrapper({ label, subLabel });
    });

    it('does not display any link', () => {
      expect(wrapper.findAll(GlLink).exists()).toBe(false);
    });
  });
});
