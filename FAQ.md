# Frequently asked questions

## What icons library do we use in GitLab UI?

GitLab has its own SVG icons library, explore it here: <https://gitlab-org.gitlab.io/gitlab-svgs/>

## How can I import icons from GitLab SVGs into GitLab UI components?

In most circumstances, you can utilize the [icon](https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-icon--default)
component to render an SVG from the gitlab-svgs library. ECharts components, however,
cannot use SVG sprite references and require the entire `path` content to be
passed in via config options. For now, we are hard-coding these in [svg_paths.js](src/utils/svgs/svg_paths.js),
but this will soon be done at build-time through a utility method.

## Why don’t we generate utilities?

When looking at [utility-mixins](src/scss/utility-mixins/index.scss), you might
wonder _"Why don't we take advantage of SCSS maps, loops and other goodies to
generate all those mixins in a more DRY manner?"_. We chose this declarative
approach because anyone not familiar with GitLab UI's styles can easily get a
grasp of what utilities are available by reading the file, no need to decipher
some complex loop.

## Some GitLab UI components are not conforming to [Pajamas Design System](https://design.gitlab.com/) can I still use them?

Some [Pajamas Design System](https://design.gitlab.com/) components implemented
in GitLab UI do not conform with the design system specs because they lack some
planned features or are not correctly styled yet. In the Pajamas website, a banner
on top of the component examples indicates that:

> This component does not yet conform to the correct styling defined in our Design
System. Refer to the Design System documentation when referencing visuals for this
component.

For example, at the time of writing, this type of warning can be observed for
[all form components](https://design.gitlab.com/components/forms). It, however,
doesn’t imply that the component should not be used.

GitLab always asks to use `<gl-*>` components whenever a suitable component exists.
It makes codebase unified and more comfortable to maintain/refactor in the future.

Ensure a [Product Designer](https://about.gitlab.com/company/team/?department=ux-department)
reviews the use of the non-conforming component as part of the MR review. Make a
follow up issue and attach it to the component implementation epic found within
the [Components of Pajamas Design System epic](https://gitlab.com/groups/gitlab-org/-/epics/973).

## I want to write tests cases for invalid uses of my component but they always fail, what's going on?

An example of that would be when you want to make sure that invalid props are handled properly
(i.e. you defined a custom validator and you want to make sure it errors out when the prop
doesn't pass the validation). In this kind of situation, Vue will log an error to the console,
which is forbidden by our global assertion in [Jest's setup](tests/jest_setup.js). To make your
test pass, make sure you reset `console.error()`'s mock at then of your test:

```js
it('should log an error', () => {
  // test you component

  global.console.error.mockReset();
});
```

## Does GitLab UI have a changelog/version history?

Yes! We generate changelogs automatically based on GitLab UI's
[conventional commits](https://www.conventionalcommits.org/) history.
Changelogs can be found in the [releases page](https://gitlab.com/gitlab-org/gitlab-ui/-/releases)
or in the [CHANGELOG.md](./CHANGELOG.md) file.

## I've added some files to GitLab UI but they aren't published in the npm package, why is that?

The files that we want published are listed in the [`files`](https://docs.npmjs.com/files/package.json#files)
field in the `package.json`. You might need to add your files to the field if its path isn't covered
by the current setup.

## I used to write examples in addition to stories, is that still a thing?

Examples have been moved to [design.gitlab.com](https://gitlab.com/gitlab-org/gitlab-services/design.gitlab.com).
We will iteratively migrate all stories to the new Component Story Format (CSF) and remove examples
as we go. If you're looking to write an example to be displayed in Pajamas specifications website,
here's how:
<https://gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/-/blob/main/doc/component-examples.md#component-examples>.
