import description from './skeleton_loading.md';

export default {
  description,

  propsInfo: {
    lines: {
      validation: {
        type: 'range',
        min: 1,
        max: 3,
      },
    },
  },
};
