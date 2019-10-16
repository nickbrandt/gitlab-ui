import { shallowMount, createLocalVue } from '@vue/test-utils';

import ResizeObserverPolyFill from 'resize-observer-polyfill';

import resizeObserver from '../../directives/resize_observer/resize_observer';

jest.mock('resize-observer-polyfill');

describe('resize observer directive', () => {
  const getObserverInstance = () => ResizeObserverPolyFill.mock.instances[0];
  const getObserverCallback = () => ResizeObserverPolyFill.mock.calls[0][0];
  const getMockObserve = () => getObserverInstance().observe;
  const getMockUnobserve = () => getObserverInstance().unobserve;

  const mockHandleResize = jest.fn();

  const localVue = createLocalVue();
  let wrapper;

  const createComponent = ({ template } = {}) => {
    const defaultTemplate = `<div v-resize-observer="handleResize"></div>`;

    const component = {
      directives: {
        resizeObserver,
      },
      methods: {
        handleResize: mockHandleResize,
      },
      template: template || defaultTemplate,
    };

    wrapper = shallowMount(component, { localVue });
  };

  afterEach(() => {
    wrapper.destroy();
    jest.restoreAllMocks();

    getMockObserve().mockClear();
    getMockUnobserve().mockClear();
  });

  it('shares one observer between multiple directive instances', () => {
    createComponent({
      template: `<div>
          <span v-resize-observer="handleResize"></span>
          <span v-resize-observer="handleResize"></span>
          <span v-resize-observer="handleResize"></span>
        </div>`,
    });

    expect(ResizeObserverPolyFill).toHaveBeenCalledTimes(1);
    expect(ResizeObserverPolyFill.mock.instances).toHaveLength(1);
  });

  it('subscribes the given DOM element to be observed', () => {
    createComponent();

    const { element } = wrapper;

    expect(getMockObserve()).toHaveBeenCalledWith(element);
  });

  it('passes the first entries "contentRect" and "target" to the given handler', () => {
    createComponent();

    const observerCallback = getObserverCallback();
    const entries = [{ contentRect: {}, target: wrapper.element }];

    observerCallback(entries);

    expect(mockHandleResize).toHaveBeenCalledTimes(1);
    expect(mockHandleResize).toHaveBeenCalledWith(entries[0]);
  });

  it('does a clean up when the component is destroyed', () => {
    createComponent();

    const { element } = wrapper;

    expect(element.glResizeHandler).not.toBeFalsy();

    wrapper.destroy();

    expect(getMockUnobserve()).toHaveBeenCalledTimes(1);
    expect(getMockUnobserve()).toHaveBeenCalledWith(element);
    expect(element.glResizeHandler).toBeFalsy();
  });

  it.each([3, '', undefined, null, false, {}, []])(
    'throws if the handler is %p instead of a function',
    directiveValue => {
      // we are going to throw, so we need to suppress error messages in jest output
      jest.spyOn(global.console, 'error').mockImplementation(() => {});

      const testComponentWithoutHandler = {
        data() {
          return {
            directiveValue,
          };
        },
        template: `<div v-resize-observer="directiveValue"></div>`,
      };

      expect(() => createComponent(testComponentWithoutHandler)).toThrow(TypeError);
    }
  );
});
