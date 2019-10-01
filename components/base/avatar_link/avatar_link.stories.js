import { text, withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './avatar_link.md';

function generateProps() {
  const props = {
    href: {
      type: String,
      default: text('href', 'https://gitlab.com/gitlab-org/gitlab'),
    },
    src: {
      type: String,
      default: text(
        'src',
        'https://assets.gitlab-static.net/uploads/-/system/project/avatar/278964/logo-extra-whitespace.png?width=64'
      ),
    },
  };

  return props;
}

documentedStoriesOf('base|avatar/avatar-link', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    template: `
    <gl-avatar-link target="blank" :href="href">
      <gl-avatar :src="src" :size="32" />
    </gl-avatar-link>
    `,
  }))
  .add('with labeled avatar', () => ({
    props: generateProps(),
    template: `
    <gl-avatar-link target="blank" :href="href">
      <gl-avatar-labeled :src="src" label="GitLab User" sub-label="@gitlab" :size="32" />
    </gl-avatar-link>
    `,
  }))
  .add('with no-image avatar', () => ({
    props: generateProps(),
    template: `
    <gl-avatar-link target="blank" :href="href">
      <gl-avatar-labeled entity-name="GitLab" label="GitLab User" sub-label="@gitlab" :size="32" />
    </gl-avatar-link>
    `,
  }));
