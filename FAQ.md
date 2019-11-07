# Frequently asked questions

## What icons library do we use in GitLab UI?

GitLab has its own SVG icons library, explore it here: https://gitlab-org.gitlab.io/gitlab-svgs/

## How can I import icons from GitLab SVGs into GitLab UI components?

In most circumstances, you can utilize the [icon](https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-icon--default) component to render an SVG from the gitlab-svgs library. ECharts components, however, cannot use SVG sprite references and require the entire `path` content to be passed in via config options. For now, we are hard-coding these in [svg_paths.js](src/utils/svgs/svg_paths.js), but this will soon be done at build-time through a utility method.

## Why don’t we generate utilities?

When looking at [utility-mixins](src/scss/utility-mixins/index.scss), you might wonder _"Why don't we take advantage of SCSS maps, loops and other goodies to generate all those mixins in a more DRY manner?"_. We chose this declarative approach because anyone not familiar with GitLab UI's styles can easily get a grasp of what utilities are available by reading the file, no need to decipher some complex loop.
