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
      test: /\.scss$/,
      loaders: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:8]'
          }
        },
        {
          loader: 'sass-loader',
          options: {
            data: `@import "./scss/variables.scss";`
          }
        }],
    },
    {
      test: /\.css$/,
      loaders: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:8]'
          }
        }
      ],
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
