import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import GlFilteredSearch from '../../../src/components/base/filtered_search/filtered_search.vue';
import { TERM_TOKEN_TYPE } from '../../../src/components/base/filtered_search/filtered_search_utils';
import GlFilteredSearchTerm from '../../../src/components/base/filtered_search/filtered_search_term.vue';
import GlFilteredSearchSuggestionList from '../../../src/components/base/filtered_search/filtered_search_suggestion_list.vue';
import GlFilteredSearchSuggestion from '../../../src/components/base/filtered_search/filtered_search_suggestion.vue';
import GlFilteredSearchToken from '../../../src/components/base/filtered_search/filtered_search_token.vue';
import GlClearIconButton from '../../../src/components/shared_components/clear_icon_button/clear_icon_button.vue';

jest.mock('../../../src/directives/tooltip');

const FakeToken = {
  props: ['active'],
  inheritAttrs: false,
  render: h => h('div'),
};

const localVue = createLocalVue();
localVue.directive('GlTooltip', () => {});

let wrapper;
describe('Filtered search', () => {
  const defaultProps = {
    availableTokens: [{ type: 'faketoken', token: FakeToken }],
  };

  const createComponent = props => {
    wrapper = shallowMount(GlFilteredSearch, {
      propsData: { ...defaultProps, ...props },
      localVue,
      stubs: {
        GlSearchBoxByClick: '<div><slot name="input"></slot></div>',
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  describe('value manipulation', () => {
    it('creates term when empty', () => {
      createComponent();
      expect(wrapper.emitted().input[0][0]).toStrictEqual([
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('adds empty term to the end when not empty', () => {
      createComponent({
        value: [{ type: 'faketoken', value: { data: '' } }],
      });

      expect(wrapper.emitted().input[0][0].pop()).toStrictEqual({
        type: TERM_TOKEN_TYPE,
        value: { data: '' },
      });
    });

    it('denormalizes strings if needed', () => {
      createComponent({
        value: ['one', 'two'],
      });

      const inputEventArgs = wrapper.emitted().input[0][0];
      expect(inputEventArgs.every(t => t.type === TERM_TOKEN_TYPE)).toBe(true);
      expect(inputEventArgs.map(t => t.value.data)).toStrictEqual(['one', 'two', '']);
    });

    it('splits strings if needed', () => {
      createComponent({
        value: ['one two'],
      });

      const inputEventArgs = wrapper.emitted().input[0][0];
      expect(inputEventArgs.every(t => t.type === TERM_TOKEN_TYPE)).toBe(true);
      expect(inputEventArgs.map(t => t.value.data)).toStrictEqual(['one', 'two', '']);
    });
  });

  describe('event handling', () => {
    it('activates token when requested', () => {
      createComponent({
        value: [{ type: 'faketoken', value: '' }],
      });
      wrapper.find(FakeToken).vm.$emit('activate');
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find(FakeToken).props('active')).toBe(true);
      });
    });

    it('deactivates token when requested', () => {
      createComponent({
        value: [{ type: 'faketoken', value: '' }],
      });
      wrapper.find(FakeToken).vm.$emit('activate');
      wrapper.find(FakeToken).vm.$emit('deactivate');
      return wrapper.vm.$nextTick().then(() => {
        expect(
          wrapper.findAll({ ref: 'tokens' }).filter(w => w.props('active') === true)
        ).toHaveLength(0);
      });
    });

    it('ignores deactivate requests from non-active tokens', () => {
      createComponent({
        value: [
          { type: 'faketoken', value: { data: '1' } },
          { type: 'faketoken', value: { data: '2' } },
        ],
      });
      return wrapper.vm
        .$nextTick()
        .then(() => {
          wrapper.find(FakeToken).vm.$emit('activate');
          wrapper
            .findAll(FakeToken)
            .at(1)
            .vm.$emit('deactivate');
          return wrapper.vm.$nextTick();
        })
        .then(() => {
          expect(wrapper.find(FakeToken).props('active')).toBe(true);
        });
    });

    it('removes empty term tokens on deactivate', () => {
      const findSecondTerm = () => wrapper.findAll(GlFilteredSearchTerm).at(1);
      createComponent({
        value: [{ type: 'faketoken', value: { data: '' } }, 'one', 'two', 'three'],
      });
      return wrapper.vm
        .$nextTick()
        .then(() => {
          findSecondTerm().vm.$emit('activate');
          findSecondTerm().vm.$emit('input', { data: '' });
          return wrapper.vm.$nextTick();
        })
        .then(() => {
          findSecondTerm().vm.$emit('deactivate');
          return wrapper.vm.$nextTick();
        })
        .then(() => {
          expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
            { type: 'faketoken', value: { data: '' } },
            { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
            { type: TERM_TOKEN_TYPE, value: { data: 'three' } },
            { type: TERM_TOKEN_TYPE, value: { data: '' } },
          ]);
        });
    });

    it('destroys token if requested', () => {
      createComponent({
        value: [{ type: 'faketoken', value: '' }, 'one'],
      });

      wrapper.find(FakeToken).vm.$emit('destroy');
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
          { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
          { type: TERM_TOKEN_TYPE, value: { data: '' } },
        ]);
      });
    });

    it('brings focus to previous token if current is destroyed', () => {
      createComponent({
        value: ['one', { type: 'faketoken', value: '' }, 'two'],
      });

      wrapper.find(FakeToken).vm.$emit('destroy');
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find(GlFilteredSearchTerm).props('active')).toBe(true);
      });
    });

    it('does not destroy last token', () => {
      createComponent();
      wrapper.find(GlFilteredSearchTerm).vm.$emit('destroy');

      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
          { type: TERM_TOKEN_TYPE, value: { data: '' } },
        ]);
      });
    });

    it('replaces token when requested', () => {
      createComponent();
      wrapper
        .find(GlFilteredSearchTerm)
        .vm.$emit('replace', { type: 'faketoken', value: { data: 'test' } });

      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
          { type: 'faketoken', value: { data: 'test' } },
          { type: TERM_TOKEN_TYPE, value: { data: '' } },
        ]);
      });
    });

    it('replaces token after clear when requested', async () => {
      createComponent({
        value: ['one', { type: 'faketoken', value: '' }, 'two'],
      });
      wrapper.find(GlClearIconButton).vm.$emit('click');

      await wrapper.vm.$nextTick();

      wrapper
        .find(GlFilteredSearchTerm)
        .vm.$emit('replace', { type: 'faketoken', value: { data: 'test' } });

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: 'faketoken', value: { data: 'test' } },
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('inserts single token when requested', () => {
      createComponent({ value: ['one'] });
      wrapper.find(GlFilteredSearchTerm).vm.$emit('activate');
      wrapper.find(GlFilteredSearchTerm).vm.$emit('split');
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
          { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
          { type: TERM_TOKEN_TYPE, value: { data: '' } },
        ]);
      });
    });

    it('jumps to last token when insert of empty term requested', () => {
      createComponent({ value: ['one', 'two'] });
      wrapper.find(GlFilteredSearchTerm).vm.$emit('activate');
      wrapper.find(GlFilteredSearchTerm).vm.$emit('split');
      return wrapper.vm.$nextTick().then(() => {
        expect(
          wrapper
            .findAll(GlFilteredSearchTerm)
            .at(2)
            .props('active')
        ).toBe(true);
        expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
          { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
          { type: TERM_TOKEN_TYPE, value: { data: 'two' } },
          { type: TERM_TOKEN_TYPE, value: { data: '' } },
        ]);
      });
    });

    it('inserts multiple tokens when requested', () => {
      createComponent({ value: ['one'] });
      wrapper.find(GlFilteredSearchTerm).vm.$emit('activate');
      return wrapper.vm
        .$nextTick()
        .then(() => {
          wrapper.find(GlFilteredSearchTerm).vm.$emit('split', ['foo', 'bar']);
          return wrapper.vm.$nextTick();
        })
        .then(() => {
          expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
            { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
            { type: TERM_TOKEN_TYPE, value: { data: 'foo' } },
            { type: TERM_TOKEN_TYPE, value: { data: 'bar' } },
            { type: TERM_TOKEN_TYPE, value: { data: '' } },
          ]);
        });
    });

    it('submits entire search when submit is requested', () => {
      createComponent();
      wrapper.find(GlFilteredSearchTerm).vm.$emit('submit');
      expect(wrapper.emitted().submit).toBeDefined();
    });
  });

  it('normalizes term tokens to strings on submit', () => {
    createComponent({
      value: ['one'],
    });
    wrapper.find(GlFilteredSearchTerm).vm.$emit('submit');
    expect(wrapper.emitted().submit).toBeDefined();
    expect(wrapper.emitted().submit[0][0]).toStrictEqual(['one']);
  });

  it('concatenates strings on submit', () => {
    createComponent({
      value: ['one', 'two', { type: 'faketoken', value: { data: 'smth' } }, 'four', 'five'],
    });
    wrapper.find(GlFilteredSearchTerm).vm.$emit('submit');
    expect(wrapper.emitted().submit).toBeDefined();
    expect(wrapper.emitted().submit[0][0]).toStrictEqual([
      'one two',
      { type: 'faketoken', value: { data: 'smth' } },
      'four five',
    ]);
  });

  it('passes required props to tokens', () => {
    createComponent({
      value: [{ type: 'faketoken', value: '' }],
    });
    const fakeTokenInstance = wrapper.find(FakeToken);
    expect(fakeTokenInstance.exists()).toBe(true);
    expect(Object.keys(fakeTokenInstance.attributes())).toEqual(
      expect.arrayContaining(['current-value', 'index', 'config', 'value'])
    );
  });
});

describe('Filtered search integration tests', () => {
  const testTokens = [
    {
      type: 'static',
      icon: 'label',
      token: GlFilteredSearchToken,
      title: 'Static-token',
      options: [
        { title: 'first', value: 'one' },
        { title: 'second', value: 'two' },
        { title: 'third', value: 'three' },
      ],
    },
    { type: 'dynamic!token', icon: 'rocket', title: 'Fake-token', token: FakeToken },
    {
      type: 'unique',
      unique: true,
      icon: 'document',
      token: GlFilteredSearchToken,
      title: 'Unique-token',
      options: [
        { title: 'first', value: 'one' },
        { title: 'second', value: 'two' },
      ],
    },
    {
      type: 'disabled',
      icon: 'document',
      title: 'Disabled-token',
      token: FakeToken,
      disabled: true,
    },
  ];

  const mountComponent = props => {
    wrapper = mount(GlFilteredSearch, {
      localVue,
      propsData: {
        availableTokens: testTokens,
        ...props,
      },
    });
  };

  const activate = idx =>
    wrapper
      .findAll(GlFilteredSearchTerm)
      .at(idx)
      .find('div.gl-filtered-search-token-segment')
      .trigger('mousedown');

  const findInput = () =>
    wrapper
      .findAll(GlFilteredSearchTerm)
      .filter(t => t.props().active)
      .at(0)
      .find('input');

  beforeAll(() => {
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = jest.fn();
    }
  });

  afterAll(() => {
    if (HTMLElement.prototype.scrollIntoView.mock) {
      delete HTMLElement.prototype.scrollIntoView;
    }
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  describe('when first term is clicked', () => {
    beforeEach(() => {
      mountComponent();
      activate(0);
      return wrapper.vm.$nextTick();
    });

    it('brings focus to term element input', () => {
      const input = findInput();
      expect(input.exists()).toBe(true);
      expect(document.activeElement).toBe(input.element);
    });

    it('displays suggestions list', () => {
      const suggestions = wrapper.find(GlFilteredSearchSuggestionList);
      expect(suggestions.exists()).toBe(true);
      expect(suggestions.findAll(GlFilteredSearchSuggestion)).toHaveLength(
        testTokens.filter(t => !t.disabled).length
      );
    });

    it('updates suggestions list as you type', () => {
      const input = findInput();
      input.setValue('sta'); // partial of "static"
      return wrapper.vm.$nextTick().then(() => {
        const suggestions = wrapper.find(GlFilteredSearchSuggestionList);
        expect(suggestions.exists()).toBe(true);
        expect(suggestions.findAll(GlFilteredSearchSuggestion)).toHaveLength(1);
      });
    });

    it('resets suggestions list as you press Space', () => {
      const input = findInput();
      input.setValue('--wrong-- ');
      return wrapper.vm.$nextTick().then(() => {
        const suggestions = wrapper.find(GlFilteredSearchSuggestionList);
        expect(suggestions.exists()).toBe(true);
        expect(suggestions.findAll(GlFilteredSearchSuggestion)).toHaveLength(3);
      });
    });

    it('does not render suggestions list if there are no suggestions available', () => {
      const input = findInput();
      input.setValue('--wrong--');
      return wrapper.vm.$nextTick().then(() => {
        const suggestions = wrapper.find(GlFilteredSearchSuggestionList);
        expect(suggestions.exists()).toBe(false);
      });
    });

    it('replaces term with token when suggestion is selected', () => {
      const input = findInput();
      input.trigger('keydown', { key: 'ArrowDown' });
      return wrapper.vm
        .$nextTick()
        .then(() => {
          input.trigger('keydown', { key: 'Enter' });
          return wrapper.vm.$nextTick();
        })
        .then(() => {
          const token = wrapper.find(GlFilteredSearchToken);
          expect(token.exists()).toBe(true);
        });
    });

    it('calls alignSuggestion for new tokens', () => {
      const input = findInput();
      input.trigger('keydown', { key: 'ArrowDown' });
      const alignSuggestionsSpy = jest.spyOn(wrapper.vm, 'alignSuggestions');
      return wrapper.vm
        .$nextTick()
        .then(() => {
          input.trigger('keydown', { key: 'Enter' });
          return wrapper.vm.$nextTick();
        })
        .then(() => {
          expect(alignSuggestionsSpy).toHaveBeenCalled();
        });
    });
  });

  it('does not render unique token in suggestions list if it is already present', () => {
    mountComponent({ value: ['token', { type: 'unique', value: { data: 'something' } }] });
    activate(0);

    return wrapper.vm.$nextTick().then(() => {
      const suggestions = wrapper.find(GlFilteredSearchSuggestionList);
      expect(suggestions.exists()).toBe(true);
      expect(suggestions.findAll(GlFilteredSearchSuggestion)).toHaveLength(2);
    });
  });

  it('correctly handles switching from one token to another', () => {
    mountComponent({ value: ['one two'] });
    activate(0);
    return wrapper.vm
      .$nextTick()
      .then(() => {
        activate(1);
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        expect(
          wrapper
            .findAll(GlFilteredSearchTerm)
            .at(1)
            .find('input')
            .exists()
        ).toBe(true);
      });
  });

  it('correctly switches focus on token destroy', () => {
    mountComponent({ value: ['one t three'] });
    activate(1);
    return wrapper.vm
      .$nextTick()
      .then(() => {
        // Unfortunately backspace is not working in JSDOM
        wrapper
          .findAll(GlFilteredSearchTerm)
          .at(1)
          .vm.$emit('destroy');
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        expect(document.activeElement).toBe(
          wrapper.find(GlFilteredSearchTerm).find('input').element
        );
      });
  });

  it('clicking clear button clears component input', () => {
    mountComponent({ value: ['one two three'] });
    wrapper
      .findAll('button')
      .filter(b => b.attributes('name') === 'clear')
      .trigger('click');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.findAll(GlFilteredSearchTerm)).toHaveLength(1);
    });
  });
});
