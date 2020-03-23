# Troubleshooting

## `yarn build -w` results a "JavaScript heap out of memory error"

Watching for changes in GitLab UI files can be memory intensive. You can increase the amount of memory you can use to run the process.

```sh
NODE_OPTIONS="--max-old-space-size=4096" yarn build -w
```

We are keeping track of this problem at https://gitlab.com/gitlab-org/gitlab-ui/issues/614
