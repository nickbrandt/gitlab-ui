# Debugging GitLab UI styling issues with GitLab product CSS

To make sure GitLab UI’s components look precisely as their design specs dictate in GitLab we've created two tools:

- `Include GitLab CSS bundle` checkbox in storybook
- `test:visual:gitlab` script

These tools will include GitLab product's final CSS in Storybook. By default CSS
of `master` branch of GitLab product is used. This means that if you made
significant changes to your component's CSS they will not be properly picked up.
Additionally, since GitLab currently uses a different color palette, you will
notice differences in colors that result in overriding the default theme colors.

In order to verify your component against proper color scheme and latest GitLab
CSS, you will need to build a custom CSS version of GitLab product. This could be
done by running `yarn run storybook:gitlab` and passing the location of your GitLab product Git repository as `GITLAB_REPOSITORY` env variable.
For example:

```shell
# cloning gitlab to temp directory
git clone https://gitlab.com/gitlab-org/gitlab.git /tmp/gitlab --depth=1
# this will build gitlab.css to static/gitlab/gitlab.css file
GITLAB_REPOSITORY="/tmp/gitlab" yarn run storybook:gitlab
```

Note that hot reloading features will not affect the GitLab product CSS bundle so
you will need to manually rerun the last command to verify your changes.

## `yarn run test:visual:gitlab` command

This command only runs visual tests for components that have the `followsDesignSystem: true`
flag activated in their `*.documentation.js` file. It will include the GitLab product’s final CSS
output in the storybook and run the visual snapshots against this version.

The tests will fail if, after rendering with GitLab CSS (which includes the GitLab UI), one or more
components look different. These failures highlight how CSS that leaks from GitLab will affect a
component’s final look in the product.
This job is consumed by GitLab CI/CD and most likely will fail locally due to font rendering differences 
on different platforms.
