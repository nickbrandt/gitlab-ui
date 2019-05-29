import { select, text, number, withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { avatarSizeOptions, avatarShapeOptions } from '../../../utils/constants';
import readme from './avatar.md';

const projectFallbackTemplate = `
  <div>
    <gl-avatar :entity-name="entityName" :entity-id="entityId" class="float-none" :size="size" shape="rect"/>
  </div>
  `;

const imageTemplate = `
  <div>
    <gl-avatar :size="size" :shape="shape" src="https://about.gitlab.com/images/press/gitlab-summit-south-africa.jpg" class="float-none"/>
  </div>
  `;

function generateImageProps() {
  const defaultSize = avatarSizeOptions[1];
  const props = {
    size: {
      type: Number,
      default: select('size', avatarSizeOptions, defaultSize),
    },
    shape: {
      type: String,
      default: select('shape', avatarShapeOptions, 'circle'),
    },
  };

  return props;
}

function generateProjectFallbackProps() {
  const defaultSize = avatarSizeOptions[1];
  const props = {
    entityId: {
      type: Number,
      default: number('entityId', 123),
    },
    entityName: {
      type: String,
      default: text('entityName', 'Some Project'),
    },
    size: {
      type: Number,
      default: select('size', avatarSizeOptions, defaultSize),
    },
  };

  return props;
}

documentedStoriesOf('base|avatar', readme)
  .addDecorator(withKnobs)
  .add('image', () => ({
    props: generateImageProps(),
    template: imageTemplate,
  }))
  .add('project-fallback', () => ({
    props: generateProjectFallbackProps(),
    template: projectFallbackTemplate,
  }));
