const path = require('path');
const webpack = require('webpack');

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
      test: /\.s?css$/,
      loaders: [
        {
          loader: 'style-loader',
          options: {
            attrs: {
              'data-gitlab-ui-style': true,
            },
          },
        },
        'css-loader',
        {
          loader: 'sass-loader',
          options: { includePaths: [require('path').resolve(__dirname, '..', 'node_modules')] },
        },
      ],
    },
    {
      test: /\.vue$/,
      exclude: /\.example\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /@gitlab\/svgs\/dist\/icons\.svg$/,
      loader: 'file-loader',
    },
    {
      test: /\.js$/,
      exclude: /node_modules\/(?!(bootstrap-vue)\/).*/,
      use: {
        loader: 'babel-loader',
        options: {
          envName: 'storybook',
        },
      },
    },
  ];

  config.plugins.push(new webpack.EnvironmentPlugin(['IS_GITLAB_INTEGRATION_TEST']));

  config.resolve.extensions = ['.css', ...config.resolve.extensions];

  config.resolve.alias['@gitlab/ui'] = path.join(__dirname, '..', 'index.js');

  // disable HMR in test environment because this breaks puppeteer's networkidle0 setting
  // which is needed for storyshots to function
  if (process.env.NODE_ENV === 'test') {
    config.entry = config.entry.filter(
      singleEntry => !singleEntry.includes('/webpack-hot-middleware/')
    );
  }

  return config;
};
