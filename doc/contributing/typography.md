# gitlab-ui typography

## Font family

gitlab-ui uses the following font stack:

- Regular: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Ubuntu,
  Cantarell, 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`
- Monospace: `'Menlo', 'DejaVu Sans Mono', 'Liberation Mono', 'Consolas', 'Ubuntu Mono',
  'Courier New', 'andale mono', 'lucida console', monospace`

## Typescale

gitlab-ui typescale is an implementation of the Pajamas [typescale specification](https://design.gitlab.com/product-foundations/typography#typescale). A complete reference of the typescale can be found in the [typescale sketch file](https://gitlab-org.gitlab.io/gitlab-design/hosted/pedro/%23168-responsive-type-spec-previews/). Text size is determined by the following parameters:

- Content type:
  - UI: default
  - Markdown: `markdown`
  - Compact Markdown: `compact-markdown`
- Media breakpoints:
  - `min-width: 0`: default
  - `min-width: 768px`: `md`
  - `min-width: 992px`: `lg`
  - `min-width: 1200px`: `xl`
- Font family:
  - Regular: default
  - Monospace: `monospace`
- Element type:
  - small paragraph / UI text: `sm`
  - medium paragraph / UI text: default
  - large paragraph / UI text: `lg`
  - headers: `h1..h6`

### Typescale variables

Typescale variables are located in the `scss/variables.scss`. They follow the naming convention:
`$gl-font-size-[content-type]-[font-family]-[element-type]-[breakpoint]`. Default typescale parameters are omitted from the variable name. For example:

```sass
$gl-font-size-h1: px-to-rem(23px); // content-type: UI, font-family: regular, element-type: h1, media breakpoint: default

$gl-font-size-markdown-h1-xl: px-to-rem(32px); // content-type: markdown, font-family: regular, element-type: h1, media-breakpoint: min-width: 1200px

$gl-font-size-compact-markdown-lg: px-to-rem(15px); // content-type: compact markdown, font-family: regular, element-type: large paragraph / label
```

### Line-height

The minimum line-height in Pajamas’ typescale specification is `16px`/`1rem`. Label text, which is any text
that is neither paragraph nor a header, uses this line-height. Paragraphs have a line-height of
`20px`/`1.25rem`. You can see the line-height for other typescale’s elements in the
[typescale sketch file](https://gitlab-org.gitlab.io/gitlab-design/hosted/pedro/%23168-responsive-type-spec-previews/).
