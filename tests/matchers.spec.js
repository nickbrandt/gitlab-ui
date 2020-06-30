test('.toHaveFocus', () => {
  const container = document.createElement('div');
  container.innerHTML = `
    <div>
      <label for="focused">test</label>
      <input id="focused" type="text" />
      <button type="submit" id="not-focused">Not Focused</button>
    </div>`;

  document.body.appendChild(container);

  const focused = container.querySelector('#focused');
  const notFocused = container.querySelector('#not-focused');

  document.body.appendChild(container);
  focused.focus();

  expect(focused).toHaveFocus();
  expect(notFocused).not.toHaveFocus();

  expect(() => expect(focused).not.toHaveFocus()).toThrowError();
  expect(() => expect(notFocused).toHaveFocus()).toThrowError();
});
