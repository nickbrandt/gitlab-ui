import { mount } from '@vue/test-utils';
import NewButton from '../../../src/components/base/new_button/new_button.vue';

describe('new button component', () => {
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
});
