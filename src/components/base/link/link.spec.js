import { shallowMount, mount } from '@vue/test-utils';
import Link from './link.vue';

const mountWithOptions = options => shallowMount(Link, options);

describe('link component', () => {
  const httpLink = 'http://test.host/safe_link.html';
  // eslint-disable-next-line no-script-url
  const javascriptLink = 'javascript:alert("xss")';
  const linkText = 'Link Text';

  const linkProps = {
    hreflang: 'XR',
    rel: 'alternate',
    type: 'text/html',
    media: 'all',
  };

  describe('default settings', () => {
    let link;

    beforeEach(() => {
      link = mountWithOptions({});
    });

    it('should not have a set rel attribute', () => {
      expect(link.vm.relType).toBeUndefined();
    });

    it('should not have a target attribute', () => {
      expect(link.vm.$el.getAttribute('target')).toBe(null);
    });
  });

  describe('target blank', () => {
    const mockedHostFunction = jest.fn(() => 'http://test.com');
    const externalLink = {
      propsData: {
        target: '_blank',
        href: 'http://example.com',
      },
      computed: {
        hostname: mockedHostFunction,
      },
    };
    it('should set noopener and noreferrer for hrefs in a different domain', () => {
      const link = mountWithOptions(externalLink);
      expect(link.vm.relType).toBe('noopener noreferrer');
    });

    it('should keep rel attribute for hrefs in the same domain', () => {
      const linkWithRel = mountWithOptions({
        propsData: { href: '/docs/link' },
        attrs: { rel: 'noopener' },
      });

      expect(linkWithRel.vm.relType).toEqual('noopener');
    });

    it('should append noopener and noreferrer to the existing rel value', () => {
      const linkWithRel = mountWithOptions({
        ...externalLink,
        attrs: { rel: 'nofollow' },
      });

      expect(linkWithRel.attributes('rel')).toEqual('nofollow noopener noreferrer');
    });
  });

  describe('invalid link', () => {
    let linkWrapper;

    beforeEach(() => {
      linkWrapper = mountWithOptions({ propsData: { href: javascriptLink } });
    });

    it('should render a span element', () => {
      expect(linkWrapper.contains('span')).toBe(true);
      expect(linkWrapper.contains('a')).toBe(false);
    });
  });

  describe('valid link', () => {
    let props;
    let linkWrapper;
    const linkAttrsAndProps = { ...linkProps, href: httpLink };

    beforeEach(() => {
      props = { href: httpLink, ...linkProps };
      linkWrapper = mount(Link, { propsData: props, slots: { default: [linkText] } });
    });

    it('renders a link element', () => {
      expect(linkWrapper.contains('a')).toBe(true);
      expect(linkWrapper.contains('span')).toBe(false);
    });

    it('should have gl-link class', () => {
      expect(linkWrapper.classes('gl-link')).toBe(true);
    });

    it.each(Object.keys(linkAttrsAndProps))('link has %s attribute set correctly', key => {
      expect(linkWrapper.attributes(key)).toEqual(linkAttrsAndProps[key]);
    });

    it('renders the inner text as provided', () => {
      expect(linkWrapper.text()).toEqual(linkText);
    });
  });
});
