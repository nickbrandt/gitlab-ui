import * as urlUtils from '../url_utils';
import { absoluteUrls, nonHttpUrls, encodedJavaScriptUrls, relativeUrls } from './mock_data';

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

  describe('isSafeUrl', () => {
    const urlsWithoutHost = ['http://', 'https://'];

    const safeUrls = [...absoluteUrls, ...relativeUrls];
    const unsafeUrls = [...urlsWithoutHost, ...nonHttpUrls, ...encodedJavaScriptUrls];

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
