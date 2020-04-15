import { mount } from '@vue/test-utils';
import NewButton from '../../../src/components/base/button/button.vue';

describe('button component', () => {
  const mountWithOptions = mount.bind(null, NewButton);

  describe('ellipsis button', () => {
    let button;

    beforeEach(() => {
      button = mountWithOptions({
        propsData: {
          icon: 'ellipsis_h',
        },
      });
    });

    it('should add `button-ellipsis-horizontal` class', () => {
      expect(button.classes()).toContain('button-ellipsis-horizontal');
    });
  });

  describe('label button', () => {
    let button;

    beforeEach(() => {
      button = mountWithOptions({
        propsData: {
          label: true,
        },
      });
    });

    it('should add `btn-label` class', () => {
      expect(button.classes()).toContain('btn-label');
    });
  });
});
