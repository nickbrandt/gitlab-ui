module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules = [
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
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
	  "presets": [
	    [
	      "env",
	      {
	        "modules": false,
	        "targets": {
	          "ie": "11"
	        }
	      }
	    ]
	  ],
        }
      }
    }
  ];

  return storybookBaseConfig;
};
