# Adding a new component to GitLab UI

1. Decide on a component you'd like to add to `gitlab-ui`.
1. Determine and document the scenarios (different types of implementations, if any) in which this component is used in `gitlab` in an issue in `gitlab-ui`.
1. Select a scenario that is implemented in `gitlab` that you will replace with your component.
1. Run `yarn generate:component` and follow the instructions, or create the files structure manually as follows (where `[component]` is the name of your component):
    1. Create a `[component]/` directory in the relevant `components/` sub-directory.
    1. In this new directory, create the following:
        1. `[component].vue` which is the component itself.
        1. `[component].stories.js` for registering Storybook's stories.
        1. `[component].documentation.js` for registering usage examples.
        1. `[component].md` for documenting the component.
        1. An `examples/` sub-directory where you'll place your examples and an `index.js` file for exposing those examples.
1. Create a merge request (MR) in `gitlab-ui` implementing your new component.
    1. Be sure to name your MR `feat: <commit message>` as that is needed for our npm release CI job (don't forget to set the MR to squash commit).
    1. Run the manual CI job (`update_screenshots`) to generate your image snapshots for diffing.
1. Create a MR to `gitlab` to replace the scenario implementation (if any) that you previously selected.
  1. To make this process easier, GitLab UI has a manual CI job called `create_integration_branch` that you can run to automatically create or update an integration branch in GitLab. You would then only need to create a new MR from that branch by following the link in the job's output.
1. Update your `package.json` dependency reference of `@gitlab/ui` to the URL output of the `upload_artifacts` CI job in your `gitlab-ui` MR.
1. Run `yarn install` to make sure that the `gitlab-ui` contents are installed.
1. If your new component is used on every page, import to `app/assets/javascripts/commons/gitlab_ui.js` so that your component is globally registered.
1. Once you've verified that your integration MR to `gitlab` is working, assign a maintainer to review both the `gitlab-ui` and `gitlab` MRs. A list of maintainers can be found on the [team](https://about.gitlab.com/team/) page.
1. Maintainer will merge the `gitlab-ui` MR, the `publish` CI job will automatically create a new release on NPM.
1. You (or maintainer) will update your integration MR's `package.json` dependency reference to the newly released `gitlab-ui` version.
1. Maintainer will merge the integration MR.