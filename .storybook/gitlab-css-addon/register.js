/**
 * We wrote this storybook addon using React.
 * Storybook implements its addon framework using React technologies like hooks and HoCs.
 * We’d had preferred using Vue <3 instead, but it is not possible at the moment.
 */
import React from 'react';
import { addons, types } from '@storybook/addons';
import { useAddonState } from '@storybook/api';

const ADDON_ID = 'gitlab-ui/gitlab-css';
const PANEL_ID = `${ADDON_ID}/panel`;
const h = React.createElement;

const EnableGitLabCssCheckbox = () => {
  const [state, setState] = useAddonState(ADDON_ID, { gitlabCssIncluded: false });
  const toggleGitLabCss = () => {
    const previewFrame = document.querySelector('#storybook-preview-iframe');
    const { gitlabCssIncluded } = state;

    setState({ gitlabCssIncluded: !gitlabCssIncluded });

    previewFrame.contentWindow.postMessage('toggleGitLabCss', '*');
  };
  const id = 'include-gitlab-css';
  const title =
    'Checking this box will include GitLab’s CSS in the storybook preview frame. You can use this feature to preview how this gitlab-ui component will look when used in GitLab.';
  const checkboxStyles = { marginRight: '8px' };

  return h('div', null, [
    h('label', { htmlFor: id, title, key: 'gitlab-css-checkbox-label' }, [
      h('input', {
        key: 'gitlab-css-checkbox',
        type: 'checkbox',
        id,
        checked: state.gitlabCssIncluded,
        autoComplete: 'off',
        styles: checkboxStyles,
        onChange: () => toggleGitLabCss(),
      }),
      'Include GitLab CSS bundle',
    ]),
  ]);
};

const addonStyles = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.875rem',
};

const GitlabCssCheckBoxToolbox = () =>
  h('div', { style: addonStyles }, [h(EnableGitLabCssCheckbox, { key: 'gitlab-css-checkbox' })]);

addons.register(ADDON_ID, () => {
  const render = () => h(GitlabCssCheckBoxToolbox);
  const title = 'GitLab CSS';

  addons.add(PANEL_ID, {
    type: types.TOOL,
    title,
    render,
  });
});
