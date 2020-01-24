# Testing your changes in a local GitLab instance

During development, you can link your local `gitlab-ui` package changes to the `gitlab` project. This means you don't need to update `package.json`, and can easily test changes.

Run the following commands to link the `gitlab-ui` package:
1. `yarn link`
1. `yarn build -w`

Then, run the following command in the `gitlab` project:
1. `yarn link @gitlab/ui`

Once you are done run `yarn unlink @gitlab/ui` within the `gitlab` project.

## Edge-case: `gitlab-ui` bundles that import other `gitlab-ui` files

The `gitlab-ui` build process produces a number of bundles, importable via `@gitlab/ui/dist/<module-name>` Some of these bundles will import other `gitlab-ui` files (for example, `@gitlab/ui/dist/charts`). This poses a problem when using `yarn link`.

**In this case, you must also link `gitlab-ui` to itself.**

If you don't, you will see an error like this when you try to load a page in `gitlab` that imports such a bundle:

```
Module not found: Error: Can't resolve '@gitlab/ui' in '/<path-to-checked-out-gitlab-ui>/dist'
```

To link `gitlab-ui` to itself, run `yarn link @gitlab/ui` within the `gitlab-ui` folder. See https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/217 for more detail.