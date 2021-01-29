# Visual regressions testing

We use the [storyshots](https://github.com/storybookjs/storybook/tree/master/addons/storyshots) addon
to generate and compare image snapshots based on [storybook](https://github.com/storybookjs/storybook)
stories. Occasionally, component or dependency updates can create visual differences which can cause
the pipeline to fail on `main` because of the failing `visual` job.

Before proceeding make sure that the updated image snapshots:

- Still comply with the design system guidelines.
- Do not include any unexpected visual elements.

To inspect the image snapshots causing the pipeline to fail, browse the failing `visual`
job's artifacts. The relevant snapshots are added in the `tests/__image_snapshots__/__diff_output__`
directory.

Once you have confirmed that visual differences are expected and aren't regressions, trigger the
manual CI job `update_screenshots` to regenerate the snapshots.

## Excluding stories from visual testing

If your story doesn't showcase any relevant UI components, you may want to exclude it from visual
regressions tests. For that use case, storyshots lets you skip visual tests for specific stories,
or for a whole component, using the `storyshots` parameter.

> **Note:** While skipping visual tests on given stories is a possibility, it is not meant to skip
> non-deterministic tests. If a story contains random elements, or any other variable that could
> lead to flakiness, you should make sure that it is deterministic in the test environment.

### Excluding a whole component

To exclude a whole component from visual tests, define the parameter with the chainable
`.addParameters` method. For example:

```js
documentedStoriesOf('directives|resize-observer-directive', readme)
  .addParameters({ storyshots: false })
  .add('default', () => {
    // ...
  })
  .add('foobar', () => {
    // ...
  })
```

In the example above, both `default` and `foobar` are omitted from visual testing.

### Excluding a single story

To exclude a single story from visual tests, pass the parameter to `.add`'s third argument.
For example:

```js
documentedStoriesOf('directives|intersection-observer', readme)
  .add('default', () => {
    // ...
  })
  .add('foobar', () => {
    // ...
  }, { storyshots: false })
```

In the example above, `foobar` is omitted from visual testing, but `default` is not.
