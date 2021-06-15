import React, { useContext } from 'react';
import { snakeCase } from 'lodash';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { Button } from '@storybook/components';

const BASE_URL = 'https://gitlab.com/gitlab-org/gitlab-ui/-/tree/main/src/components';

const components = require.context('../../../src/components', true, /\.vue$/);

export const LinkToSource = (props) => {
  const context = useContext(DocsContext);
  const { kind } = context;
  if (!kind) {
    return null;
  }
  const componentName = snakeCase(kind.replace(/.*\/([^/]+)$/, '$1'));
  const filePath = components.keys().find((path) => path.endsWith(`/${componentName}.vue`));
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
