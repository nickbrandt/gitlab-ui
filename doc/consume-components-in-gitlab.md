# Consume components in GitLab

GitLab UI provides a set of reusable components to be consumed in GitLab to follow design guidelines and ensure consistency.

## Getting started

When integrating a component into GitLab's code base, it's good to start by listing all the files where the previous implementation needs to be replaced by the GitLab UI component. These files can then be grouped into 3 categories: Vue components, Vanilla JS and Haml templates. It's also good to make a list of pages or areas where this component will be utilized, to go through regular regression testing during the development process.

## Vue components

This is the most straightforward aspect of integration GitLab UI components. Components should be consumed as Vue components in existing Vue files, as described in stories and examples documented in the GitLab UI storybook. This should be the first step because the rendered result of a component will inform how to integrate it in the next steps.

## Vanilla JS

Sometimes, a component is rendered in plain Javascript. It's not common and should be avoided. If this use case is encountered during integration, migrating it to Vue is the best option. If that's not possible, then the previous step should be used to check how the component is rendered. The proper HTML tag and all CSS classes should be used to render the component as intended. Inline styles might be required, though they should be avoided as much as possible.

## Haml templates

There are 2 use cases of Haml templates: Pure Haml or Haml templates used in a Vue component shell.

### Haml in Vue component shell

Views in GitLab are a mix of Haml templates and Vue components. If a Haml template is paired with a Javascript file initialising a Vue component, Vue components defined as Single File Components can be rendered in the template, using a tag following the style `%[component-name]` once imported in the Javascript file. Detailed documentation about this process is in the [Vue](https://docs.gitlab.com/ee/development/fe_guide/vue.html#an-indexjs-file) section of the GitLab Frontend Development Guidelines.

### Example

```haml
%gl-label{ ":background-color" => "label.color", ":title" => "label.title", ":description" => "label.description", "tooltipPlacement" => "bottom"}
```

### Pure Haml template

If a Haml template does not get any data from Javascript, then the Vue component cannot be used. In that case, it's good to look at how it's currently rendered in the previous use cases to use the proper HTML tag and copy over all the proper classes for it to render properly. If the component was previously rendered using a utility or Ruby helper function, then this function should be updated to reflect the necessary changes to its look and feel.
