import { mount } from '@vue/test-utils';
import sprintf from '../../../src/components/base/sprintf/sprintf.vue';

describe('sprintf component', () => {
  let wrapper;

  const createComponent = (template = '') => {
    wrapper = mount({
      template: `<div class="wrapper">${template}</div>`,
      components: {
        sprintf,
      },
    });
  };

  it.each`
    message
    ${''}
    ${'Foo'}
    ${'%{author}'}
    ${'Written by %{author}'}
  `('should return message if slots have no data', ({ message }) => {
    createComponent(`<sprintf message="${message}"/>`);

    expect(wrapper.element.innerHTML).toBe(message);
  });

  it.each`
    message                   | html
    ${'%{author}'}            | ${'<span>Author</span>'}
    ${'Written by %{author}'} | ${'Written by <span>Author</span>'}
    ${'Foo %{author} bar'}    | ${'Foo <span>Author</span> bar'}
    ${'  %{author}  '}        | ${'  <span>Author</span>  '}
    ${'%{author}%{author}'}   | ${'<span>Author</span><span>Author</span>'}
  `('should replace placeholder with component', ({ message, html }) => {
    createComponent(
      `<sprintf message="${message}">
        <template #author>
          <span>Author</span>
        </template>
      </sprintf>`
    );

    expect(wrapper.element.innerHTML).toBe(html);
  });

  it('should be able to re-use a placeholder multiple times', () => {
    createComponent(
      `<sprintf message="%{author} is an excellent %{author}">
        <template #author>
          <span>Author</span>
        </template>
      </sprintf>`
    );

    expect(wrapper.element.innerHTML).toBe(
      '<span>Author</span> is an excellent <span>Author</span>'
    );
  });

  it('should be able to use templates as slots', () => {
    createComponent(
      `<sprintf message="Written by %{author}">
        <template #author>Author</template>
      </sprintf>`
    );

    expect(wrapper.element.innerHTML).toBe('Written by Author');
  });

  it('should work with a default slot', () => {
    createComponent(
      `<sprintf message="Written by %{default}">
        <template>Author</template>
      </sprintf>`
    );

    expect(wrapper.element.innerHTML).toBe('Written by Author');
  });
});
