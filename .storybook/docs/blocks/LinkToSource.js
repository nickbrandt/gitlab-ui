import React, { useContext } from 'react';
import { snakeCase } from 'lodash';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { Button } from '@storybook/components';
import * as modules from '../../../index';

const BASE_URL = 'https://gitlab.com/gitlab-org/gitlab-ui/-/tree/main/src';

const components = require.context(
  '../../../src/',
  true,
  /^(?!.*(?:(spec|documentation|stories).js$|examples|utils)).*\.(vue|js)$/
);

export const LinkToSource = (props) => {
  const context = useContext(DocsContext);
  const componentName = context?.parameters?.component?.name;
  if (!componentName) {
    return null;
  }
  const fileName = snakeCase(componentName).replace(/^gl_/, '');
  const pattern = new RegExp(`/${fileName}.(vue|js)$`);
  const filePath = components.keys().find((path) => pattern.test(path));
  if (!filePath) {
    return null;
  }
  const href = `${BASE_URL}/${filePath.replace(/^\.\//, '')}`;
  return (
    <Button href={href} rel="noopener" target="_blank" isLink small {...props}>
      View source
    </Button>
  );
};
