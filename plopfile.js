const snakecase = require('lodash.snakecase');

const baseFolder = 'src/components/base/{{name}}';
const scssFolder = '../components/base/{{name}}';
const templateFolder = 'templates';

const commonActions = [
  {
    type: 'add',
    path: `${baseFolder}/examples/{{name}}.basic.example.vue`,
    templateFile: `${templateFolder}/basic.example.vue`,
  },
  {
    type: 'add',
    path: `${baseFolder}/examples/index.js`,
    templateFile: `${templateFolder}/example.index.js`,
  },
  {
    type: 'append',
    pattern: 'ADD COMPONENT EXPORTS - needed for yarn generate:component. Do not remove',
    path: 'index.js',
    template: `export { default as Gl{{pascalCase name}} } from './${baseFolder}/{{name}}.vue';`,
  },
  {
    type: 'append',
    pattern: 'ADD EXPORTS - needed for yarn generate:component. Do not remove',
    path: 'documentation/components_documentation.js',
    template: `export { default as Gl{{pascalCase name}}Documentation } from '../${baseFolder}/{{name}}.documentation';`,
  },
  {
    type: 'append',
    pattern: 'ADD COMPONENT IMPORTS - needed for yarn generate:component. Do not remove',
    path: 'src/scss/components.scss',
    template: `@import '${scssFolder}/{{name}}';`,
  },
  {
    type: 'add',
    path: `${baseFolder}/{{name}}.stories.js`,
    templateFile: `${templateFolder}/story.js`,
  },
  {
    type: 'add',
    path: `${baseFolder}/{{name}}.scss`,
  },
];

module.exports = plop => {
  plop.setGenerator('Create Component', {
    description: 'Create basic empty component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name in snake_case, e.g. progress_bar:\n',
      },
    ],
    actions() {
      const actions = [
        ...commonActions,
        {
          type: 'add',
          path: `${baseFolder}/{{name}}.vue`,
          templateFile: `${templateFolder}/component.vue`,
        },
        {
          type: 'add',
          path: `${baseFolder}/{{name}}.md`,
          template: '',
        },
        {
          type: 'add',
          path: `${baseFolder}/{{name}}.documentation.js`,
          templateFile: `${templateFolder}/documentation.js`,
        },
      ];

      return actions;
    },
  });

  plop.setGenerator('Wrap BootstrapVue Component', {
    description: 'Create a gl_ component as a simple wrapper',
    prompts: [
      {
        type: 'input',
        name: 'bootstrapVueComponentName',
        message: 'BS component name in PascalCase, e.g. BTable:\n',
      },
    ],
    actions(data) {
      // eslint-disable-next-line no-param-reassign
      data.name = snakecase(data.bootstrapVueComponentName).replace(/^b_/, '');

      const actions = [
        ...commonActions,
        {
          type: 'add',
          path: `${baseFolder}/{{name}}.vue`,
          templateFile: `${templateFolder}/bs_component.vue`,
        },
        {
          type: 'add',
          path: `${baseFolder}/{{name}}.md`,
          templateFile: `${templateFolder}/bs_documentation.md`,
        },
        {
          type: 'add',
          path: `${baseFolder}/{{name}}.documentation.js`,
          templateFile: `${templateFolder}/bs_documentation.js`,
        },
      ];

      return actions;
    },
  });
};
