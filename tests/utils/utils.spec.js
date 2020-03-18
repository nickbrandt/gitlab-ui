import { isElementFocusable, focusFirstFocusableElement, ellipsize } from '../../src/utils/utils';

describe('isElementFocusable', () => {
  const myBtn = () => document.querySelector('button');
  const myInput = () => document.querySelector('input');

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return true for a button', () => {
    document.body.innerHTML = '<button> My Button </button>';

    expect(isElementFocusable(myBtn())).toBe(true);
  });

  it('should return false for an element with a z-index of -1', () => {
    document.body.innerHTML = '<button z-index="-1"> My Button </button>';

    expect(isElementFocusable(myBtn())).toBe(false);
  });

  it('should return true for an input', () => {
    document.body.innerHTML = '<input type="text" />';

    expect(isElementFocusable(myInput())).toBe(true);
  });

  it('should return false for an input with a type hidden', () => {
    document.body.innerHTML = '<input type="hidden" />';

    expect(isElementFocusable(myInput())).toBe(false);
  });

  it('should return false for a disabled button', () => {
    document.body.innerHTML = '<button disabled> My Button </button>';

    expect(isElementFocusable(myBtn())).toBe(false);
  });

  it('should return true for an anchor tag with an href attribute', () => {
    document.body.innerHTML = '<a href="mylink"> My Link </a>';
    const myAnchor = document.querySelector('a');

    expect(isElementFocusable(myAnchor)).toBe(true);
  });

  it('should return true for an anchor tag without an href attribute', () => {
    document.body.innerHTML = '<a href=""> My Link </a>';
    const myAnchor = document.querySelector('a');

    expect(isElementFocusable(myAnchor)).toBe(false);
  });
});

describe('focusFirstFocusableElement', () => {
  const myBtn = () => document.querySelector('button');
  const myInput = () => document.querySelector('input');

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('Focus the first element of the list if available', () => {
    document.body.innerHTML = '<div><div><button></button><input /></div></div>';

    focusFirstFocusableElement([myBtn(), myInput()]);

    expect(document.activeElement).toBe(myBtn());
  });

  it('Focus the second element of the list if the first is not valid', () => {
    document.body.innerHTML = '<div><div><button disabled></button><input /></div></div>';

    focusFirstFocusableElement([myBtn(), myInput()]);

    expect(document.activeElement).toBe(myInput());
  });
});

describe('ellipsize', () => {
  [
    {
      input: '',
      output: '',
    },
    {
      input: null,
      output: '',
    },
    {
      input: 'abc',
      output: 'abc',
    },
    {
      input: 123,
      output: '123',
    },
    {
      input: 'abcdefgh',
      output: 'abcde...',
    },
    {
      input: 'abcdefgh',
      output: 'a...',
      size: 1,
    },
    {
      input: 'abcdefgh',
      output: 'abcdefgh',
      size: 0,
    },
  ].forEach(({ input, output, size }) => {
    it(`ellipsize with size ${size} returns ${output} for ${input}`, () => {
      expect(ellipsize(input, size)).toBe(output);
    });
  });
});
