// register.js

import React from 'react';
import { addons, types } from '@storybook/addons';
import { useAddonState } from '@storybook/api';
import { AddonPanel } from '@storybook/components';

const ADDON_ID = 'gitlab-ui/gitlab-css';
const PANEL_ID = `${ADDON_ID}/panel`;
const h = React.createElement;

const helpText = () =>
  h(
    'p',
    null,
    `
  Checking this box will include GitLab's CSS in the storybook preview frame.
  You can use this feature to preview how this gitlab-ui component will look
  when used in GitLab.
`
  );

const EnableGitLabCssCheckbox = () => {
  const [state, setState] = useAddonState(ADDON_ID, { gitlabCssIncluded: false });
  const toggleGitLabCss = () => {
    const previewFrame = document.querySelector('#storybook-preview-iframe');
    const { gitlabCssIncluded } = state;

    setState({ gitlabCssIncluded: !gitlabCssIncluded });

    previewFrame.contentWindow.postMessage('toggleGitLabCss', '*');
  };

  return h('div', null, [
    h('input', {
      type: 'checkbox',
      checked: state.gitlabCssIncluded,
      autoComplete: 'off',
      onChange: () => toggleGitLabCss(),
    }),
    h('label', null, ['Include GitLab CSS bundle']),
  ]);
};

const GitlabCssPanel = () =>
  h('div', { style: { padding: '16px' } }, [h(EnableGitLabCssCheckbox), h(helpText)]);

addons.register(ADDON_ID, api => {
  const render = ({ active, key }) => h(AddonPanel, { active, key }, h(GitlabCssPanel, { key }));
  const title = 'GitLab CSS';

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
  });
});
