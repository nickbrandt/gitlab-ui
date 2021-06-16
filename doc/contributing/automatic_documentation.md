# Automatic documentation

We have automated as much of our documentation as possible (for example props, inherited props,
`v-model`, links to underlying documentation, etc.) and kept manual tasks (for example name of
vue-bootstrap component, slot descriptions, etc.) to an absolute minimum. The target for our
documentation components and exports is to have them automatically integrated into the
[GitLab Design System](https://design.gitlab.com), also known as Pajamas. The main component for
documentation is called `component_documentation_generator.vue`.

## Component documentation info

To add additional information to our documentation page we are using extra files which hold
additional information, those have the format `(component).documentation.js` in the component
directory. The following sample has a sample documentation attribute with all possibilities.
All of these properties are optional.

<!-- markdownlint-disable MD013 -->
```js
export default {
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
<!-- markdownlint-enable MD013 -->

## v-model

`v-model` information is automatically added to component documentation if the component
defines a [`model`](https://vuejs.org/v2/api/#model).
