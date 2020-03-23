# Testing your changes in a local GitLab instance

During development, you can link your local `@gitlab/ui` package changes to the GitLab project. This means you don't need to update `package.json`, and can easily test changes.

Run the following commands to link the `@gitlab/ui` package:
1. `yarn link`
1. `yarn build -w`

Then, run the following command in the `gitlab` project:
1. `yarn link @gitlab/ui`

Once you are done run `yarn unlink @gitlab/ui` within the `gitlab` project.
