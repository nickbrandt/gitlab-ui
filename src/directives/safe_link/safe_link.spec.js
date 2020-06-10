import { shallowMount } from '@vue/test-utils';
import safeLink from './safe_link';
import { absoluteUrls, javascriptUrls, encodedJavaScriptUrls, relativeUrls } from './mock_data';

const httpLink = 'https://gitlab.com';

describe('safe link directive', () => {
  let wrapper;

  const createComponent = ({ href } = {}) => {
    const component = {
      directives: {
        safeLink,
      },
      data() {
        return {
          href,
        };
      },
      template: `<a v-safe-link :href="href" target="_blank">Click</a>`,
    };

    wrapper = shallowMount(component);
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
    it.each(javascriptUrls)('%s should be sanitized', url => {
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
    it.each(validUrls)('%s should be rendered', url => {
      createComponent({
        href: url,
      });
      expect(wrapper.attributes('href')).toBe(url);
    });
  });
});
