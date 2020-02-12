# Troubleshooting

## What to do when image snapshots cause the pipeline to fail

We use the [storyshots](https://github.com/storybookjs/storybook/tree/master/addons/storyshots) addon to generate and compare image snapshots based on [storybook](https://github.com/storybookjs/storybook) stories. Occasionally, component or dependency updates can create visual differences which can cause the pipeline to fail on master because of the failing `visual` job.

Before proceeding make sure that the updated image snapshots a) still comply with the design system guidelines and b) do not include any unexpected visual elements. You can inspect the image snapshots causing the pipeline to fail via browsing the job artifacts from the failing `visual` job. The relevant snapshots are added in the `tests/__image_snapshots__/__diff_output__` directory.

1. Create a branch locally and delete the image snapshots causing the pipeline failure.
2. Commit and push the changes to create a merge request.
3. Manually trigger the `update_screenshots` job in the failing pipeline and regenerate snapshots.

## `yarn build -w` results a "JavaScript heap out of memory error"

Watching for changes in `gitlab-ui` files can be memory intensive. You can increase the amount of memory you can use to run the process.

```sh
NODE_OPTIONS="--max-old-space-size=4096" yarn build -w
```

We are keeping track of this problem at https://gitlab.com/gitlab-org/gitlab-ui/issues/614
