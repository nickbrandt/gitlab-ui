# GitLab UI's commit conventions

We use conventional commits specifications to write meaningful commit messages that are used as part of our [semantic release](https://gitlab.com/gitlab-org/gitlab-ui/wikis/Frequently-asked-questions#2-why-are-we-using-semantic-release) process.

Please read the official specifications for more details: https://www.conventionalcommits.org/.

When opening an MR, make sure you do at least one of the following:

- Include at least one commit message that complies with the conventional commit standards.
- Ensure the MR's title itself complies with the conventional commit standards.

Following these conventions will result in a properly versioned package and clear [changelogs](./CHANGELOG.md) for every version.
and clear [changelogs](./CHANGELOG.md) for every version.

## When should my MR's title follow these conventions?

It's always a good idea to follow the conventions for your MR's title as well as for commit messages, this way, if your MR is squashed
upon merge, the maintainer will be able to use its title as the final commit message, which will result in a properly formatted history.

## Is it okay that all my commits don't follow the conventions in a single MR?

It's recommended that all commits follow the conventions because we refer to those commits when generating changelogs. Imagine your MR's
history looks like this:

```
2b2b2b2 Correcting something in the awesome feature
1a1a1a1 feat: adding an awesome feature
```

When generating the changelog for the above, we will reference commit `1a1a1a1` which follows the conventions, but looking at the diff
for this commit will not give a complete overview of the feature it describes, which might be confusing. Ideally, commit `2b2b2b2` should
have been squashed in `1a1a1a1`.

It's okay to not always follow the recommendation above, as long as every meaningful change is described by one properly formatted message.
Example:

```
3c3c3c3 Apply review suggestion
1a1a1a1 feat: adding an awesome feature
```

In the example above, you might want to keep `1a1a1a1` and `3c3c3c3` separated to help in the review process and that would be fine.

> **Note:** It would NOT be all right for `3c3c3c3` to follow the conventions because it doesn't bring any meaningful change to `master`.
> Conventional commits should only be used to describe changes that will land in the main branch, NOT for changes to your own branch.

## What types can I use for my commit messages?

Here are the types we recommend you use:

```
feat:     A new feature
fix:      A bug fix
docs:     Documentation only changes
style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf:     A code change that improves performance
test:     Adding missing tests or correcting existing tests
build:    Changes that affect the build system or external dependencies
ci:       Changes to our CI configuration files and scripts
chore:    Other changes that don't modify src or test files
revert:   Reverts a previous commit
```

> **Note:** Only `feat:` and `fix:` types trigger a new release
> If you're introducing a breaking change, the message body should start with [`BREAKING CHANGE:`](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-description-and-breaking-change-footer),
> this will trigger a major version bump (e.g. `v1.2.3` -> `v2.0.0`)

## Commitizen

https://commitizen.github.io/cz-cli/

Commitizen is a CLI tool that provides an interactive interface to help you write commit messages following conventional commits specifications.

> **Note:** We also limit commit messages subject's and body's length with Danger: [Dangerfile](./danger/semantic-commit/Dangerfile)