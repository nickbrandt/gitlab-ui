import { mount } from '@vue/test-utils';
import sprintf from '../../../src/components/utilities/sprintf/sprintf.vue';

describe('sprintf component', () => {
  let wrapper;
  const objectPrototypeNames = Object.getOwnPropertyNames(Object.prototype).filter(name =>
    /^[a-z]/i.test(name)
  );

  const createComponent = (template = '') => {
    wrapper = mount({
      template: `<div class="wrapper">${template}</div>`,
      components: {
        sprintf,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  describe('plain placeholders', () => {
    it.each`
      message
      ${''}
      ${'Foo'}
      ${'%{author}'}
      ${'Written by %{author}'}
      ${'Written by %{author-name}'}
      ${'Written by %{author1}'}
      ${'Written by %{author_name}'}
    `('should return message if slots have no data', ({ message }) => {
      createComponent(`<sprintf message="${message}"/>`);

      expect(wrapper.element.innerHTML).toBe(message);
    });

    it.each`
      message                                | html
      ${'%{author}'}                         | ${'<span>Author</span>'}
      ${'Written by %{author}'}              | ${'Written by <span>Author</span>'}
      ${'Foo %{author} bar'}                 | ${'Foo <span>Author</span> bar'}
      ${'  %{author}  '}                     | ${'  <span>Author</span>  '}
      ${'%{author}%{author}'}                | ${'<span>Author</span><span>Author</span>'}
      ${'%{author} known as %{author-name}'} | ${'<span>Author</span> known as <span>John Doe</span>'}
      ${'%{author1}'}                        | ${'<span>Author #1</span>'}
      ${'%{author_name}'}                    | ${'<span>Author Name</span>'}
    `('should replace placeholder with component', ({ message, html }) => {
      createComponent(
        `<sprintf message="${message}">
        <template #author>
          <span>Author</span>
        </template>
        <template #author-name>
          <span>John Doe</span>
        </template>
        <template #author1>
          <span>Author #1</span>
        </template>
        <template #author_name>
          <span>Author Name</span>
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

    describe('Object prototype names', () => {
      it.each(objectPrototypeNames)(
        'does not use Object.prototype.%s as slot if slot is not provided',
        prototypeName => {
          createComponent(`<sprintf message="%{${prototypeName}}"></sprintf>`);

          expect(wrapper.element.innerHTML).toBe(`%{${prototypeName}}`);
        }
      );

      it.each(objectPrototypeNames)('can use provided slot named "%s"', prototypeName => {
        createComponent(
          `<sprintf message="%{${prototypeName}}">
             <template #${prototypeName}>${prototypeName} OK!</template>
           </sprintf>`
        );

        expect(wrapper.element.innerHTML).toBe(`${prototypeName} OK!`);
      });
    });
  });

  describe('start/end placeholders', () => {
    it('should work', () => {
      createComponent(
        `<sprintf message="Click %{linkStart}here%{linkEnd}, please">
           <template #link="{ content }">
             <a href="#">{{ content }}</a>
           </template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('Click <a href="#">here</a>, please');
    });

    it('should work with a default slot', () => {
      createComponent(
        `<sprintf message="Foo %{defaultStart}default%{defaultEnd} baz">
           <template #default="{ content }">{{ content }}</template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('Foo default baz');
    });

    it('does not render start/end content if slot does not consume it', () => {
      createComponent(
        `<sprintf message="Click %{linkStart}here%{linkEnd}, please">
           <template #link>
             <a href="#">foo</a>
           </template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('Click <a href="#">foo</a>, please');
    });

    it('can interpolate multiple start/end placeholders', () => {
      createComponent(
        `<sprintf message="Foo %{barStart}bar%{barEnd} %{quxStart}qux%{quxEnd} baz">
           <template #bar="{ content }">
             <a>{{ content }}</a>
           </template>
           <template #qux="{ content }">
             <b>{{ content }}</b>
           </template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('Foo <a>bar</a> <b>qux</b> baz');
    });

    it('treats out-of-order start/end placeholders as plain slots', () => {
      createComponent(
        `<sprintf message="Foo %{barEnd}bar%{barStart} qux">
           <template #bar="{ content }">
             <a>{{ content }} fail if in output!</a>
           </template>
           <template #barStart>
             <b>barStart</b>
           </template>
           <template #barEnd>
             <i>barEnd</i>
           </template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('Foo <i>barEnd</i>bar<b>barStart</b> qux');
    });

    it('should handle start/end placeholders at the beginning and end of the message', () => {
      createComponent(
        `<sprintf message="%{fooStart}bar%{fooEnd}">
           <template #foo="{ content }"><b>{{ content }}</b></template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('<b>bar</b>');
    });

    it('treats a start placeholder without an end as a plain placeholder', () => {
      createComponent(
        `<sprintf message="foo %{barStart} baz">
           <template #barStart>start</template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('foo start baz');
    });

    it('treats an end placeholder without a start as a plain placeholder', () => {
      createComponent(
        `<sprintf message="foo %{barEnd} baz">
           <template #barEnd>end</template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('foo end baz');
    });

    it('should not interpolate more than one level deep, even if slots are provided', () => {
      createComponent(
        `<sprintf message="foo %{spanStart}foo %{baz} %{strongStart}strong%{strongEnd}%{spanEnd}">
           <template #span="{ content }"><span>{{ content }}</span></template>
           <template #baz>baz</template>
           <template #strong="{ content }"><strong>{{ content }}</strong></template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe(
        'foo <span>foo %{baz} %{strongStart}strong%{strongEnd}</span>'
      );
    });

    it('works with no content between start/end placeholders', () => {
      createComponent(
        `<sprintf message="foo %{barStart}%{barEnd} baz">
           <template #bar="{ content }"><i>{{ content }}</i></template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe('foo <i></i> baz');
    });

    it('returns the message if slot is not provided', () => {
      createComponent(`<sprintf message="Click %{linkStart}here%{linkEnd}"></sprintf>`);

      expect(wrapper.element.innerHTML).toBe('Click %{linkStart}here%{linkEnd}');
    });

    it('works with the example in the documentation', () => {
      // From: https://gitlab.com/gitlab-org/gitlab/blob/v12.6.4-ee/doc/development/i18n/externalization.md#L300-303
      createComponent(
        `<sprintf message="Learn more about %{linkStart}zones%{linkEnd}">
           <template #link="{ content }">
             <a
               href="https://cloud.google.com/compute/docs/regions-zones/regions-zones"
               target="_blank"
               rel="noopener noreferrer"
             >{{ content }}</a>
           </template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe(
        'Learn more about <a href="https://cloud.google.com/compute/docs/regions-zones/regions-zones" target="_blank" rel="noopener noreferrer">zones</a>'
      );
    });

    it('resists XSS attacks', () => {
      createComponent(
        `<sprintf message="Click %{linkStart}<script>alert('hello')</script>%{linkEnd}, please">
           <template #link="{ content }">
             <a href="#">{{ content }}</a>
           </template>
         </sprintf>`
      );

      expect(wrapper.element.innerHTML).toBe(
        'Click <a href="#">&lt;script&gt;alert(\'hello\')&lt;/script&gt;</a>, please'
      );
    });

    describe('Object prototype names', () => {
      it.each(objectPrototypeNames)(
        'does not use Object.prototype.%s as slot if slot is not provided',
        prototypeName => {
          createComponent(
            `<sprintf message="%{${prototypeName}Start} foo %{${prototypeName}End}"></sprintf>`
          );

          expect(wrapper.element.innerHTML).toBe(
            `%{${prototypeName}Start} foo %{${prototypeName}End}`
          );
        }
      );

      it.each(objectPrototypeNames)('can use provided slot named "%s"', prototypeName => {
        createComponent(
          `<sprintf message="%{${prototypeName}Start}foo%{${prototypeName}End}">
               <template #${prototypeName}="{ content }">{{ content }}</template>
             </sprintf>`
        );

        expect(wrapper.element.innerHTML).toBe('foo');
      });
    });
  });
});
