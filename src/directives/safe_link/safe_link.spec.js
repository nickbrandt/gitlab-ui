import { shallowMount } from '@vue/test-utils';
import safeLink from './safe_link';
import { javascriptUrls, encodedJavaScriptUrls } from './mock_data';

const httpLink = 'https://gitlab.com';

// eslint-disable-next-line no-script-url
const javascriptLink = 'javascript:alert("xss")';

const invalidAnchorLink = 'about:blank';

describe('safe link directive', () => {
  let wrapper;

  const createComponent = ({ template, href } = {}) => {
    const defaultTemplate = `<a v-safe-link :href="href">Click</a>`;

    const component = {
      directives: {
        safeLink,
      },
      data() {
        return {
          href,
        };
      },
      template: template || defaultTemplate,
    };

    wrapper = shallowMount(component);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  describe('default', () => {
    it('should render the anchor tag with provided href value', () => {
      createComponent({
        href: httpLink,
      });

      expect(wrapper.element.tagName).toEqual('A');
      expect(wrapper.element.getAttribute('href')).toEqual(`${httpLink}/`);
    });
  });

  describe('unsafe urls', () => {
    it('zz', () => {
      createComponent({
        template: `<a href='${encodedJavaScriptUrls[0]}'>clicme</a>`,
      });
      console.log(wrapper.html());
      expect(wrapper.element.getAttribute('href')).toEqual(`${invalidAnchorLink}`);
    });
    // const unsafeUrls = [javascriptUrls, ...encodedJavaScriptUrls];

    // it.each(unsafeUrls)('set valid href for %s', url => {
    //   createComponent({
    //     template: `<a href='${url}'>clicme</a>`,
    //   });
    //   console.log(wrapper.html());
    //   expect(wrapper.element.getAttribute('href')).toEqual(`${InvalidHref}`);
    // });
  });
});
