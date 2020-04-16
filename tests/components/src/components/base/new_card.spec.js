import { shallowMount } from '@vue/test-utils';
import GlNewCard from '../../../../../src/components/base/new_card/new_card.vue';

describe('GlNewCard', () => {
  let wrapper;

  const HEADER_TEXT = 'In legal trouble?';
  const BODY_TEXT = 'Better call Saul!';
  const FOOTER_TEXT = '(505) 503-4455';

  const HEADER_CLASS = '.bg-red .text-white';
  const BODY_CLASS = '.bg-yellow .font-script';
  const FOOTER_CLASS = '.bg-yellow .text-white';

  const createWrapper = (options = {}) => {
    wrapper = shallowMount(GlNewCard, options);
  };

  const findBody = () => wrapper.find('.gl-new-card-body');
  const findHeader = () => wrapper.find('.gl-new-card-header');
  const findFooter = () => wrapper.find('.gl-new-card-footer');

  afterEach(() => {
    wrapper.destroy();
  });

  describe('with just the body content', () => {
    beforeEach(() => {
      createWrapper({
        propsData: {
          bodyClass: BODY_CLASS,
        },
        slots: {
          default: BODY_TEXT,
        },
      });
    });

    it('should render the body content', () => {
      expect(findBody().exists()).toBe(true);
      expect(findBody().text()).toEqual(BODY_TEXT);
    });

    it('should add the body class', () => {
      expect(findBody().classes()).toContain(...BODY_CLASS.split(' '));
    });

    it('should not render the header content', () => {
      expect(findHeader().exists()).toBe(false);
    });

    it('should not render the footer content', () => {
      expect(findFooter().exists()).toBe(false);
    });
  });

  describe('with additional header content', () => {
    beforeEach(() => {
      createWrapper({
        propsData: {
          headerClass: HEADER_CLASS,
        },
        slots: {
          default: BODY_TEXT,
          header: HEADER_TEXT,
        },
      });
    });

    it('should render the body content', () => {
      expect(findBody().exists()).toBe(true);
      expect(findBody().text()).toEqual(BODY_TEXT);
    });

    it('should render the header content', () => {
      expect(findHeader().exists()).toBe(true);
      expect(findHeader().text()).toEqual(HEADER_TEXT);
    });

    it('should add the header class', () => {
      expect(findHeader().classes()).toContain(...HEADER_CLASS.split(' '));
    });

    it('should not render the footer content', () => {
      expect(findFooter().exists()).toBe(false);
    });
  });

  describe('with additional footer content', () => {
    beforeEach(() => {
      createWrapper({
        propsData: {
          footerClass: FOOTER_CLASS,
        },
        slots: {
          default: BODY_TEXT,
          footer: FOOTER_TEXT,
        },
      });
    });

    it('should render the body content', () => {
      expect(findBody().exists()).toBe(true);
      expect(findBody().text()).toEqual(BODY_TEXT);
    });

    it('should not render the header content', () => {
      expect(findHeader().exists()).toBe(false);
    });

    it('should not render the footer content', () => {
      expect(findFooter().exists()).toBe(true);
      expect(findFooter().text()).toEqual(FOOTER_TEXT);
    });

    it('should add the footer class', () => {
      expect(findFooter().classes()).toContain(...FOOTER_CLASS.split(' '));
    });
  });
});
