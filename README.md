# GitLab UI

GitLab UI is a UI component library written in [Vue.js](https://vuejs.org).
See https://gitlab-org.gitlab.io/gitlab-ui/ for documentation.

## Usage

To use GitLab UI in your project, add it as a dependency:

```sh
yarn add @gitlab/ui
```

> **Note:** Make sure to also install GitLab UI's peer dependencies. Refer to the
> [`package.json`](./package.json) for the list of peer dependencies and their expected versions.

Import the components as desired:

```javascript
import { GlButton } from '@gitlab/ui';
```

GitLab UI is compatible with tree-shaking, you may enable this in your project to reduce bundle sizes.

### GitLab UI CSS

GitLab UI provides component styles, a utility-class library and SCSS utilities. See the [CSS usage documentation](doc/css.md) for more information.

## Quick start - development

Make sure you have [Node](https://nodejs.org/en/) 8.x (LTS) and [Yarn](https://yarnpkg.com/) 1.2 or newer.

```sh
# Clone the project
git clone git@gitlab.com:gitlab-org/gitlab-ui.git

# Navigate to the root of the project
cd gitlab-ui

# Install all the dependencies of the project
yarn # or yarn install

# Build and launch storybook to see the components in the browser
yarn storybook
```

Go to http://localhost:9001/

## Testing

### Unit tests

Components’ unit tests live in the `tests/components`. The tests are organized following the same directory structure used to organize components.

`yarn test:unit` runs all unit tests.

`yarn test:unit:watch` runs all unit tests in watch mode.

`yarn test:unit:debug` runs all unit tests and allow to attach a debugger to the test runner process.

`yarn jest [name_pattern]` runs spec files that match the specified name pattern.

#### Examples

`yarn jest datepicker` will match all spec files with a name that contains the word _datepicker_.

`yarn jest datepicker -t "when draw event is emitted"` goes a step further and only runs the test with a description that matches the argument passed to the `t` flag.

### SCSS tests

Even though we try to avoid writing complex SASS code to maintain CSS complexity low, we’ve implemented some functions that benefit from automated testing. SASS tests live in the `tests/scss` directory. GitLab UI uses [sass-true](https://www.oddbird.net/true/) to implement these tests, and jest run them.

`yarn jest run_scss_tests` runs all SCSS tests.

### Visual regression tests

GitLab UI uses visual snapshot tests to prevent introducing unexpected regressions with CSS and layout changes on components. The tool we use is [storyshots](https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-core), a storybook addon. Read the project documentation to understand how visual snapshots work.

There is a visual snapshot of every component’s storybook story. To run the tests, use the `yarn test:visual` command. This command runs on the CI environment and will fail if the component visual appearance changes.

#### Updating visual snapshot baseline images

In some occasions, the changes in a component’s appearance are justified. In those cases, we have to update the baseline images to match the new look. See our [visual testing documentation](doc/contributing/visual_testing.md) for how to do that.

#### GitLab visual regression tests

GitLab UI components are a reference implementation of the [Pajamas Design System components](https://design.gitlab.com/components/status). These components should conform with the design system specs, and they should look correct in the pajamas website and the GitLab product. To make sure GitLab UI’s components look precisely as their design specs dictate in GitLab, we created the `yarn run test:visual:gitlab` command.

This command only runs visual tests for components that have the `followsDesignSystem: true` flag activated in their `*.documentation.js` file. It will include gitlab product’s final CSS output in storybook and run the visual snapshots against this version.

The tests will fail if after including gitlab CSS, one or more components look different. These failures highlight how CSS that leaks from gitlab will affect a component’s final look in the product.

#### Running visual regression tests locally

Visual difference tests form part of the test suite. Rendered output can vary
from host to host (e.g., due to available fonts and how each platform renders
them), so these can fail when run locally. The easiest way to work around this
is to run a percent-based diff, and to increase the failure threshold with the
`FAILURE_THRESHOLD_TYPE` and `FAILURE_THRESHOLD` environment variables:

```sh
# Sets a 2% threshold
FAILURE_THRESHOLD_TYPE='percent' FAILURE_THRESHOLD=.02 yarn test:visual
```

`FAILURE_THRESHOLD_TYPE` defaults to `'pixel'` and `FAILURE_THRESHOLD` defaults to `1`. In the CI
environment, we consider a 1 pixel difference as a false negative that should not fail the test.

Under the hood, those variables are passed to
[`jest-image-snapshot`](https://github.com/americanexpress/jest-image-snapshot)'s config

## Installation

Install with Yarn:

```sh
yarn add @gitlab/ui
```

Install with npm:

```sh
npm install @gitlab/ui
```

## Releases
Please see [Updating Gitlab UI Packages](doc/updating-gitlab-ui-packages.md) for information on how updated packages are included in Gitlab and Pajamas.

## Contributing guide

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to add new components and contribute in general to GitLab UI.

### FAQs

Any question? Have a look at our [FAQ.md](FAQ.md), you might find the answer there.
