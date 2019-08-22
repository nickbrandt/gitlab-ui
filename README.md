# gitlab-ui

`gitlab-ui` is a UI component library written in [Vue.js](https://vuejs.org).
See https://gitlab-org.gitlab.io/gitlab-ui/ for documentation.

## Prerequisites

Make sure you have [Node](https://nodejs.org/en/) 8.x (LTS) and [Yarn](https://yarnpkg.com/) 1.2 or newer.

## Quick start

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

Visual difference tests form part of the test suite. Rendered output can vary
from host to host (e.g., due to available fonts and how each platform renders
them), so these can fail when run locally. The easiest way to work around this
is to increase the failure threshold with the `FAILURE_THRESHOLD` environment
variable:

```sh
# Sets a 2% threshold
FAILURE_THRESHOLD=.02 yarn test
```

If the variable is unset, it defaults to `0`.

## Installation

```sh
npm install @gitlab/ui
```

## Adding CSS

From GitLab 12.2 on, we are moving components styles into GitLab UI, as
described in the approved [RFC #2](https://gitlab.com/gitlab-org/frontend/rfcs/issues/2).
This approach will let us progressively decouple GitLab UI's styles from
GitLab CE's styles.

Within the components' CSS, you should include utility mixins. See
[`scss/utilities.scss`](https://gitlab.com/gitlab-org/gitlab-ui/blob/master/scss/utilities.scss)
for a comprehensive list of the available utilities. If what you are
looking for is not available, add it following the naming conventions
indicated in that file.

Files should be structured like this:

```plaintext
.
├── components
│   └── base
│       ├── button
│       │   ├── button.scss
│       │   ├── button.stories.js
│       │   └── button.vue
│       └── popover
│           ├── popover.scss
│           ├── popover.stories.js
│           └── popover.vue
└── assets
    ├──components.scss
    └── gitlab_ui.scss
```

Where each component's stylesheet contains its "modularized" style:

```scss
// button.scss

.gl-button {
  // style
  @include some-utility-mixin;
}
```

And the `assets/components.scss` file imports all components' stylesheets:

```scss
// components.scss

@import '../components/base/button/button';
@import '../components/base/popover/popover';
```

Within the component and when the component is integrated
into the application, you should still follow the
[`utility-first`](https://docs.gitlab.com/ce/development/fe_guide/style_guide_scss.html#utility-classes) 
approach for basic layout and other styles.

See [!623](https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/623)
for an example and [!624](https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/624)
for the first pass implementation of silent classes. Follow along with the development
epic at [&1590](https://gitlab.com/groups/gitlab-org/-/epics/1590).

## Contributing guide

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to add new components and contribute in general to `gitlab-ui`.
