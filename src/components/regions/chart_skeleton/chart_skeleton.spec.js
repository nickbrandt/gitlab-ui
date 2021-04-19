import { shallowMount } from '@vue/test-utils';
import GlChartSkeletonLoader from './chart_skeleton.vue';

describe('Resizable Skeleton Loader', () => {
  let wrapper;

  const createComponent = (propsData = {}) => {
    wrapper = shallowMount(GlChartSkeletonLoader, {
      propsData,
    });
  };

  const verifyElementsPresence = () => {
    const gridItems = wrapper.findAll('[data-testid="skeleton-chart-grid"]').wrappers;
    const barItems = wrapper.findAll('[data-testid="skeleton-chart-bar"]').wrappers;
    const labelItems = wrapper.findAll('[data-testid="skeleton-chart-label"]').wrappers;
    expect(gridItems).toHaveLength(3);
    expect(barItems).toHaveLength(8);
    expect(labelItems).toHaveLength(8);
  };

  afterEach(() => {
    if (wrapper?.destroy) {
      wrapper.destroy();
    }
  });

  describe('default setup', () => {
    beforeEach(() => {
      createComponent({ uniqueKey: null });
    });

    it('renders the correct number of grid items, bars, and labels', () => {
      verifyElementsPresence();
    });
  });

  describe('with custom settings', () => {
    beforeEach(() => {
      createComponent({ uniqueKey: '', rx: 0.6, barWidth: 3, labelWidth: 7, labelHeight: 2 });
    });

    it('renders the correct number of grid items, bars, and labels', () => {
      verifyElementsPresence();
    });
  });
});
