module.exports = {
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {
          ie: '11',
        },
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          'env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
      plugins: ['require-context-hook'],
    },
  },
};
