import React, { useContext } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { SyntaxHighlighter } from '@storybook/components';

export const ImportInfo = ({ children }) => {
  const context = useContext(DocsContext);
  const componentName = context.parameters?.component?.name;
  if (!componentName) {
    return null;
  }
  const importStatement = `import { ${componentName} } from '@gitlab/ui';`;
  return (
    <SyntaxHighlighter copyable bordered>
      {importStatement}
    </SyntaxHighlighter>
  );
};
