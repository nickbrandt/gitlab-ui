# Frequently asked questions

## What icons library do we use in GitLab UI?

GitLab has its own SVG icons library, explore it here: https://gitlab-org.gitlab.io/gitlab-svgs/

## How can I import icons from GitLab SVGs into GitLab UI components?

In most circumstances, you can utilize the [icon](https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-icon--default) component to render an SVG from the gitlab-svgs library. ECharts components, however, cannot use SVG sprite references and require the entire `path` content to be passed in via config options. For now, we are hard-coding these in [svg_paths.js](src/utils/svgs/svg_paths.js), but this will soon be done at build-time through a utility method.

## Why don’t we generate utilities?

When looking at [utility-mixins](src/scss/utility-mixins/index.scss), you might wonder _"Why don't we take advantage of SCSS maps, loops and other goodies to generate all those mixins in a more DRY manner?"_. We chose this declarative approach because anyone not familiar with GitLab UI's styles can easily get a grasp of what utilities are available by reading the file, no need to decipher some complex loop.

## Some gitlab-ui components are not conforming to [Pajamas Design System](https://design.gitlab.com/), can I still use them?
Some [Pajamas Design System](https://design.gitlab.com/) components implemented in gitlab-ui do not conform with the design system specs because they lack some planned features or are not correctly styled yet. In the Pajamas website, a banner on top of the component examples indicates that:

> This component does not yet conform to the correct styling defined in our Design System. Refer to the Design System documentation when referencing visuals for this component.

For example, at the time of writing, this type of warning can be observed for [all form components](https://design.gitlab.com/components/forms). It, however, doesn’t imply that the component should not be used.

GitLab always asks to use `<gl-*>` components whenever a suitable component exists. It makes codebase unified and more comfortable to maintain/refactor in the future.

Ensure a [Product Designer](https://about.gitlab.com/company/team/?department=ux-department) reviews the use of the non-conforming component as part of the MR review. Make a follow up issue and attach it to the component implementation epic found within the [Components of Pajamas Design System epic](https://gitlab.com/groups/gitlab-org/-/epics/973).

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
