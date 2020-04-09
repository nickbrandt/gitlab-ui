const path = require('path');
const webpack = require('webpack');

const sassLoaderOptions = {
  includePaths: [require('path').resolve(__dirname, '..', 'node_modules')],
};

module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.(md|html)$/,
      loader: 'raw-loader',
    },
    {
      test: /\.example\.vue$/,
      loader: 'raw-loader',
    },
    {
      /*
       * This rule is used to load the typescale demo CSS
       * in a isolated shadow root
       */
      test: /typescale\/\w+_demo\.scss$/,
      loaders: [
        'raw-loader',
        {
          loader: 'sass-loader',
          options: sassLoaderOptions,
        },
      ],
    },
    {
      test: /\.s?css$/,
      exclude: /typescale\/\w+_demo\.scss$/, // skip typescale demo stylesheets
      loaders: [
        {
          loader: 'style-loader',
          options: {
            insert: function(styles) {
              const gitlabStyles = Array.from(
                document.head.querySelectorAll('[data-gitlab-ui-style]')
              );

              const targetPosition =
                gitlabStyles.length > 0
                  ? gitlabStyles[gitlabStyles.length - 1].nextSibling
                  : document.head.firstChild;

              document.head.insertBefore(styles, targetPosition);
            },
            attributes: {
              'data-gitlab-ui-style': true,
            },
          },
        },
        'css-loader',
        {
          loader: 'sass-loader',
          options: sassLoaderOptions,
        },
      ],
    },
    {
      test: /\.vue$/,
      exclude: /\.example\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /@gitlab\/svgs\/dist\/(icons|illustrations\/.+)\.svg$/,
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

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      IS_GITLAB_INTEGRATION_TEST: false,
      IS_VISUAL_TEST: false,
    })
  );

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
