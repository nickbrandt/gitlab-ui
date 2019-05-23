const path = require('path');
module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.md$/,
      loader: 'raw-loader',
    },
    {
      test: /\.example\.vue$/,
      loader: 'raw-loader',
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    },
    {
      test: /\.vue$/,
      exclude: /\.example\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /@gitlab\/svgs\/dist\/icons\.svg$/,
      loader: 'raw-loader',
    },
  ];

  config.resolve.alias['@gitlab/ui'] = path.join(__dirname, '..', 'index.js');

  return config;
};
