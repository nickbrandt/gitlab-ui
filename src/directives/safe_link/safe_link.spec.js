import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';
import GlLink from '../../components/base/link/link.vue';
import { absoluteUrls, javascriptUrls, encodedJavaScriptUrls, relativeUrls } from './mock_data';
import { SafeLinkDirective } from './safe_link';

const httpLink = 'https://gitlab.com';

describe('safe link directive', () => {
  let wrapper;

  const createComponent = ({
    href,
    components,
    template = `<a v-safe-link :href="href" target="_blank">Click</a>`,
    mountFn = shallowMount,
  } = {}) => {
    const component = {
      directives: {
        SafeLink: SafeLinkDirective,
      },
      components,
      data() {
        return {
          href,
        };
      },
      template,
    };

    wrapper = mountFn(component);
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  describe('default', () => {
    it('should render the anchor tag with given href', () => {
      createComponent({
        href: httpLink,
      });

      expect(wrapper.element.tagName).toBe('A');
      expect(wrapper.attributes('href')).toBe(httpLink);
    });

    it('should render the element with secure rel attr', () => {
      createComponent({
        href: httpLink,
      });

      expect(wrapper.attributes('rel')).toBe(`noopener noreferrer`);
    });
  });

  describe('invalid urls', () => {
    it.each(javascriptUrls)('%s should be sanitized', (url) => {
      createComponent({
        href: url,
      });
      expect(wrapper.attributes('href')).toBe('about:blank');
    });
  });

  describe('valid urls', () => {
    const validUrls = [...absoluteUrls, ...relativeUrls, ...encodedJavaScriptUrls];
    /* Note:
    /* Encoded JavaScript URLs are safe urls in Vue context, since 
    /* Vue attribute bindings are also automatically escaped
    /* https://vuejs.org/v2/guide/security.html#Injecting-URLs
    */
    it.each(validUrls)('%s should be rendered', (url) => {
      createComponent({
        href: url,
      });
      expect(wrapper.attributes('href')).toBe(url);
    });
  });

  describe('reactivity', () => {
    it('should sanitize the updated url', async () => {
      createComponent({
        mountFn: mount,
        components: { GlLink },
        template: '<gl-link :href="href" target="_blank">Click</gl-link>',
        href: javascriptUrls[0],
      });

      expect(wrapper.attributes('href')).toBe('about:blank');

      // set href to a valid url
      wrapper.setData({ href: 'https://gitlab.com' });
      await Vue.nextTick();
      expect(wrapper.attributes('href')).toBe('https://gitlab.com');

      // set href to back to an invalid url
      wrapper.setData({ href: javascriptUrls[1] });
      await Vue.nextTick();
      expect(wrapper.attributes('href')).toBe('about:blank');
    });
  });
});
