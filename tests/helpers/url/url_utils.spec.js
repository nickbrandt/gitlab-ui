import * as urlUtils from '../../../src/utils/url_utils';
import { absoluteUrls, nonHttpUrls, encodedJavaScriptUrls, rootRelativeUrls } from './mock_data';

const setWindowLocation = value => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value,
  });
};

describe('URL utility', () => {
  describe('getBaseURL', () => {
    beforeEach(() => {
      setWindowLocation({
        protocol: 'https:',
        host: 'gitlab.com',
      });
    });

    it('returns correct base URL', () => {
      expect(urlUtils.getBaseURL()).toBe('https://gitlab.com');
    });
  });

  describe('isAbsoluteOrRootRelative', () => {
    const validUrls = [...absoluteUrls, ...rootRelativeUrls];

    const invalidUrls = [' https://gitlab.com/', './file/path', 'notanurl', '<a></a>'];

    it.each(validUrls)(`returns true for %s`, url => {
      expect(urlUtils.isAbsoluteOrRootRelative(url)).toBe(true);
    });

    it.each(invalidUrls)(`returns false for %s`, url => {
      expect(urlUtils.isAbsoluteOrRootRelative(url)).toBe(false);
    });
  });

  describe('isFragment', () => {
    const validUrls = ['#docs/link', '#1', '#'];

    const invalidUrls = [' https://gitlab.com/', './file/path', 'notanurl', '<a></a>'];

    it.each(validUrls)(`returns true for %s`, url => {
      expect(urlUtils.isFragment(url)).toBe(true);
    });

    it.each(invalidUrls)(`returns false for %s`, url => {
      expect(urlUtils.isFragment(url)).toBe(false);
    });
  });

  describe('isSafeUrl', () => {
    const relativeUrls = ['./relative/link', '../relative/link'];

    const urlsWithoutHost = ['http://', 'https://', 'https:https:https:'];

    const safeUrls = [...absoluteUrls, ...rootRelativeUrls];
    const unsafeUrls = [
      ...relativeUrls,
      ...urlsWithoutHost,
      ...nonHttpUrls,
      ...encodedJavaScriptUrls,
    ];

    describe('with URL constructor support', () => {
      it.each(safeUrls)('returns true for %s', url => {
        expect(urlUtils.isSafeURL(url)).toBe(true);
      });

      it.each(unsafeUrls)('returns false for %s', url => {
        expect(urlUtils.isSafeURL(url)).toBe(false);
      });
    });
  });
});
