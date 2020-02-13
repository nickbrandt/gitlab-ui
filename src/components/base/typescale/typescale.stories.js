import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import typescaleDemo from './demo.html';

const component = {
  template: `<div class="gl-typescale-ui">
    ${typescaleDemo}
  </div>`,
};

documentedStoriesOf('base|typescale/ui', '')
  .add('>1200px', () => component, { viewport: { defaultViewport: 'breakpointExtraLarge' } })
  .add('>992px', () => component, { viewport: { defaultViewport: 'breakpointLarge' } })
  .add('>768px', () => component, { viewport: { defaultViewport: 'breakpointMedium' } })
  .add('>0', () => component, { viewport: { defaultViewport: 'breakpointSmall' } });
