## How to add a new component to gitlab-ui

1. Decide on a component you'd like to add to gitlab-ui
1. Determine and document the scenarios (different types of implementations, if any) in which this component is used in gitlab in an issue in gitlab-ui
1. Select a scenario that is implemented in the main gitlab repo that you will replace with your component
1. Run `yarn generate:component` and follow the instructions, or:
   1. Create a directory in the relevant `components/` sub-directory
   1. Create `[component].vue`, `[component].stories.js`, and `[component].documentation.js` in the directory you created in the previous step (where `[component]` is the name of your component).
   1. Create at least one example in your component directory.
1. Import your component to `index.js`
1. Run the manual CI job (update_screenshots) to generate your image snapshots for diffing
1. Create a merge request (MR) in gitlab-ui implementing your new component
   1. Be sure to name your MR `feat: <commit message>` as that is needed for our npm release CI job (don't forget to set the MR to squash commit)

1. Create a MR to the main gitlab codebase to replace the scenario implementation (if any) that you previously selected
1. Update your package.json dependency reference of @gitlab/ui to the URL output of the upload_artifacts ci job in your gitlab-ui MR
1. Run yarn install to make sure that the gitlab-ui contents are installed
1. If your new component is used on every page, import to app/assets/javascripts/commons/gitlab_ui.js so that your component is globally registered
1. Once you've verified that your integration MR to gitlab is working, assign a maintainer to review both gitlab-ui and gitlab MRs (a list of maintainers can be found on the [team](https://about.gitlab.com/team/) page)
1. Maintainer will merge the gitlab-ui MR, the publish CI job will automatically create a new release on NPM
1. (You or maintainer) will update your integration MR package.json dependency reference to the newly released gitlab-ui version
1. Maintainer will merge the integration MR

## Conventional commits

We use conventional commits specifications to write meaningful commit messages that are used as part of our semantic release process.

Please read the official specifications for more details: https://www.conventionalcommits.org/

When opening an MR, make sure your changes are descibed by at least one commit message following conventional commit conventions,
and/or that the MR's title itself follows those conventions. Following these conventions will result in a properly versioned package
and clear changelogs for every version.

### When should my MR's title follow these conventions?

It's always a good idea to follow the conventions for your MR's title as well as for commit messages, this way, if your MR is squashed
upon merge, the maintainer will be able to use its title as the final commit message, which will result in a properly formatted history.

### Is it okay that all my commits don't follow the conventions in a single MR?

It's recommended that all commits follow the conventions because we refer to those commits when generating changelogs. Imagine your MR's
history looks like this:

```
2b2b2b2 Correcting something in the awesome feature
1a1a1a1 feat: adding an awesome feature
```

When generating the changelog for the above, we will reference commit `1a1a1a1` which follows the conventions, but looking at the diff
for this commit will not give a complete overview of the feature it descibes, which might be confusing. Idealy, commit `2b2b2b2` should
have been squashed in `1a1a1a1`.

It's okay to not always follow the recommendation above, as long as every meaningful change is described by one properly formatted message.
Example:

```
3c3c3c3 Apply review suggestion
1a1a1a1 feat: adding an awesome feature
```

In the example above, you might want to keep `1a1a1a1` and `3c3c3c3` separated to help in the review process and that would be fine.

> NOTE: It would NOT be all right for `3c3c3c3` to follow the conventions because it doesn't bring any meaningful change to `master`.
> Conventional commits should only be used to describe changes that will land in the main branch, NOT for changes to your own branch.

### What types can I use for my commit messages?

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

> Note that only `feat:` and `fix:` types trigger a new release

### Commitizen

https://commitizen.github.io/cz-cli/

Commitizen is a CLI tool that provides an interactive interface to help you write commit messages following conventional commits specifications.

## Link local gitlab-ui with gitlab

During development, you can link your local gitlab-ui changes to gitlab. This means you don't need to update `package.json`, and can easily test changes.

1. `yarn link`
1. `yarn build -w`
1. (in gitab directory) `yarn link "@gitlab/ui"`

When you are finished, run `yarn unlink` in gitlab directory.

### Edge-case: Importing specific bundles

If you load a gitlab page that imports a specific gitlab-ui bundle (e.g. `import { x } from '@gitlab/ui/dist/charts;'`, you must also link gitlab-ui to itself.

If you don't, you will see an error like this:

```
Module not found: Error: Can't resolve '@gitlab/ui' in '/<path-to-checked-out-gitlab-ui>/dist'
```

To fix this, run `yarn link "@gitlab/ui"` within the gitlab-ui folder. See https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/179 for more detail.

## Automatic documentation

We have automated as much of our documentation as possible (for example props, inherited props, links to underlying documentation, etc.) and kept manual tasks (for example name of vue-bootstrap component, slot descriptions, etc.) to an absolute minimum. The target for our documentation components and exports is to have them automatically integrated into [design.gitlab.com](https://design.gitlab.com). The main component for documentation is called `component_documentation_generator.vue`.

## Automatic deploys

We use [`semantic-release`](https://gitlab.com/gitlab-org/gitlab-ui/wikis/Frequently-asked-questions#2-why-are-we-using-semantic-release) to automatically publish `gitlab-ui`.
Please follow [this specification](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) to ensure your changes will be automatically deployed.

### Component documentation info

To add additional information to our documentation page we are using extra files which hold additional information, those have the format `(component).documentation.js` in the component directory. The following sample has a sample documentation attribute with all possibilities. All of these properties are optional.

```
export default {
  examples: glTestExamples,           // Imported Example File
  description: doc,                   // Imported Documentation file
  followsDesignSystem: true,          // If we have already fully styled this component according to design system
  bootstrapComponent: 'b-button',     // Name of the underlying vue-bootstrap component
  propsInfo: {                        // Adds description for props
    limits: {                         // Specific property name with additional info
      additionalInfo: 'The object must contain the xs, sm, md and default keys',  // Extra information that is shown in the documentation
    },
    lines: {
      validation: {                   // Specific validation for a property, atm only 'range' is supported as type
        type: 'range',
        min: 1,
        max: 3,
      },
    },
  },
  bootstrapPropsInfo: {               // Same structure as the propsInfo but to describe vue-bootstrap component properties with additional information (like enum's, slots, etc.)
    variant: {                        // Name of that property
      enum: 'buttonVariantOptions',   // Name of the used enum
    },
  },
  events: [                           // Describe events for the documentation that are emitted
    {
      event: 'click',                 // Name of the event
      description: 'Emitted when clicked on button',  // Description of the Event
    },
  ],
  slots: [                            // Available slots for this component
    {
      name: 'modal-header',           // Name of the slot
      description:
        'Entire modal header container contents. Also removes the top right X close button.', // Description of the purpose of this slot
    },
  ]
};
```

## Troubleshooting

### What to do when image snapshots cause the pipeline to fail

We use the [storyshots](https://github.com/storybookjs/storybook/tree/master/addons/storyshots) addon to generate and compare image snapshots based on [storybook](https://github.com/storybookjs/storybook) stories. Occasionally, component or dependency updates can create visual differences which can cause the pipeline to fail on master because of the failing `visual` job.

Before proceeding make sure that the updated image snapshots a) still comply with the design system guidelines and b) do not include any unexpected visual elements. You can inspect the image snapshots causing the pipeline to fail via browsing the job artifacts from the failing `visual` job. The relevant snapshots are added in the `tests/__image_snapshots__/__diff_output__` directory.

1. Create a branch locally and delete the image snapshots causing the pipeline failure.
2. Commit and push the changes to create a merge request.
3. Manually trigger the `update_screenshots` job in the failing pipeline and regenerate snapshots.

## Contribution guidelines

Please refer to [gitlab's CONTRIBUTING.md](https://gitlab.com/gitlab-org/gitlab/blob/master/CONTRIBUTING.md) for details on our guidelines.
