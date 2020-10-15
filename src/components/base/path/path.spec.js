import { shallowMount } from '@vue/test-utils';
import GlPath from './path.vue';
import items from './mock_data';

const SELECTED_CLASS_INDIGO = 'gl-path-active-item-indigo';
const SELECTED_CLASS_GREEN = 'gl-path-active-item-green';
const BACKGROUND_COLOR_WHITE = 'white';
const BACKGROUND_COLOR_LIGHT_GRAY = '#f0f0f0';

describe('Path', () => {
  let wrapper;

  const createComponent = props => {
    return shallowMount(GlPath, {
      propsData: {
        items,
        ...props,
      },
    });
  };

  const pathNav = () => {
    return wrapper.find('[data-testid="gl-path-nav"]').element;
  };

  const listItems = () => {
    return wrapper.vm.$refs.pathListItems;
  };

  const pathItemAt = index => {
    return listItems()[index].children[0];
  };

  const pathItemTextAt = index => {
    return pathItemAt(index).textContent;
  };

  const clickItemAt = index => {
    pathItemAt(index).click();
  };

  beforeEach(() => {
    wrapper = createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('theme selection', () => {
    describe('default', () => {
      it('applies the indigo theme', () => {
        expect(pathItemAt(0).classList).toContain(SELECTED_CLASS_INDIGO);
      });
    });

    describe('with a theme specified', () => {
      beforeEach(() => {
        wrapper = createComponent({ theme: 'green' });
      });

      it('sets the correct theme', () => {
        expect(pathItemAt(0).classList).toContain(SELECTED_CLASS_GREEN);
      });
    });
  });

  describe('background color selection', () => {
    describe('with no background color specified', () => {
      it('displays the default background color', () => {
        expect(pathNav().style.PathBgColor).toBe(BACKGROUND_COLOR_WHITE);
      });
    });

    describe('with a background color specified', () => {
      beforeEach(() => {
        wrapper = createComponent({ backgroundColor: BACKGROUND_COLOR_LIGHT_GRAY });
      });

      it('sets the correct background color', () => {
        expect(pathNav().style.PathBgColor).toBe(BACKGROUND_COLOR_LIGHT_GRAY);
      });
    });
  });

  describe('renders the list of items', () => {
    it('renders the correct number of items', () => {
      expect(listItems().length).toBe(items.length);
    });

    it('renders the items in the correct order', () => {
      expect(pathItemTextAt(0)).toContain(items[0].title);
      expect(pathItemTextAt(4)).toContain(items[4].title);
      expect(pathItemTextAt(9)).toContain(items[9].title);
    });

    describe('with metrics', () => {
      beforeEach(() => {
        const data = items;
        data[0].metric = '12d';

        wrapper = createComponent({ items: data });
      });

      it('matches the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('renders the inline metric', () => {
        expect(pathItemTextAt(0)).toContain(items[0].title);
        expect(pathItemTextAt(0)).toContain(items[0].metric);
      });
    });

    describe('with icons', () => {
      const iconName = 'home';

      beforeEach(() => {
        const data = items;
        data[0].icon = iconName;

        wrapper = createComponent({ items: data });
      });

      it('matches the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('renders the inline icon', () => {
        const icon = wrapper.find('[data-testid="gl-path-item-icon"]');

        expect(icon.exists()).toBe(true);
        expect(icon.props('name')).toBe(iconName);
      });
    });
  });

  describe('renders the correct selected item', () => {
    describe('with no selected item passed in', () => {
      it('selects the first item', () => {
        expect(pathItemAt(0).classList).toContain(SELECTED_CLASS_INDIGO);
      });
    });

    describe('with a specifically selected item passed in', () => {
      beforeEach(() => {
        const data = items;
        data[3].selected = true;

        wrapper = createComponent({ items: data });
      });

      it('selects the correct item', () => {
        expect(pathItemAt(3).classList).toContain(SELECTED_CLASS_INDIGO);
      });
    });

    describe('with multiple selected items passed in', () => {
      beforeEach(() => {
        const data = items;
        data[3].selected = true;
        data[5].selected = true;

        wrapper = createComponent({ items: data });
      });

      it('selects the first selected option', () => {
        expect(pathItemAt(3).classList).toContain(SELECTED_CLASS_INDIGO);
        expect(pathItemAt(5).classList).not.toContain(SELECTED_CLASS_INDIGO);
      });
    });
  });

  describe('event handling', () => {
    describe('when an item is clicked', () => {
      it('emits the selected event with the correct data', () => {
        clickItemAt(1);
        clickItemAt(4);
        clickItemAt(6);

        expect(wrapper.emittedByOrder()).toEqual([
          { name: 'selected', args: [items[1]] },
          { name: 'selected', args: [items[4]] },
          { name: 'selected', args: [items[6]] },
        ]);
      });
    });
  });
});
