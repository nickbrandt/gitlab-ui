import * as svgUtils from '../../helpers/svg_utils';

describe('svg utils', () => {
  describe('makePathRect', () => {
    it('generates svg draw path content for a rectangle', () => {
      expect(svgUtils.makePathRect(10, 20, 30, 40)).toEqual('M10,20H40V60H10Z');
    });
  });
});
