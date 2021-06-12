import React, { useContext } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { Button } from '@storybook/components';

const BASE_URL = 'https://gitlab.com/gitlab-org/gitlab-ui/-/tree/main/src/components';

export const LinkToSource = () => {
  const context = useContext(DocsContext);
  const { kind: directory } = context;
  if (!directory) {
    return null;
  }
  const filename = directory.replace(/.*\/([^/]+)$/, '$1');
  const href = `${BASE_URL}/${directory}/${filename}.vue`;
  return (
    <Button href={href} rel="noopener" target="_blank" isLink tertiary>
      View source
    </Button>
  );
};
