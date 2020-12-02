# How GitLab UI interacts with GitLab

- We do not import GitLab UI variables directly into GitLab. GitLab
  UI variables are only available to GitLab UI components through their
  definitions in the GitLab UI.
- In GitLab, if a CSS class relies on GitLab variables and it is applied to a
  non-GitLab UI component, GitLab variables determine what we see.
- In GitLab, if a GitLab UI component is used and we don't apply any other CSS,
  GitLab UI variables determine what we see through the classes that use them,
  because we import the component classes into the framework.
- In GitLab, if a CSS class relies on variables *and* is applied to
  a GitLab UI component, we must determine which class is more specific.
  When this happens, every specific GitLab component stylesheet loads
  later, and overwrites GitLab UI with its specificity. This is often when we
  need to use [`!important` classes](https://gitlab.com/gitlab-org/gitlab-ui/-/blob/master/doc/css.md#utility-class-specifity).
- In GitLab, you can use utility classes as a way to use GitLab UI styles. You
  can also run into specificity issues here, as Gitlab may have more-targeted classes. 
  Using the
  [`!important` classes](https://gitlab.com/gitlab-org/gitlab-ui/-/blob/master/doc/css.md#utility-class-specifity)
  can help solve this problem.

## Debugging GitLab UI styling issues with GitLab product CSS

To make sure GitLab UI’s components look precisely as their design specs dictate
in GitLab, we’ve created the `Include GitLab CSS bundle` checkbox in storybook.

It will include GitLab product's final CSS in Storybook. By default CSS
of `master` branch of GitLab product is used. This means that if you made
significant changes to your component's CSS they will not be properly picked up.
Additionally, since GitLab currently uses a different color palette, you will
notice differences in colors that result in overriding the default theme colors.

In order to verify your component against proper color scheme and latest GitLab
CSS, you will need to build a custom CSS version of GitLab product. This could be
done by running `yarn run storybook:gitlab` and passing the location of your GitLab
product Git repository as a `GITLAB_REPOSITORY` environment variable.
For example:

```shell
# cloning gitlab to temp directory
git clone https://gitlab.com/gitlab-org/gitlab.git /tmp/gitlab --depth=1
# this will build gitlab.css to static/gitlab/gitlab.css file
GITLAB_REPOSITORY="/tmp/gitlab" yarn run storybook:gitlab
```

Note that hot reloading features will not affect the GitLab product CSS bundle so
you will need to manually rerun the last command to verify your changes.
