const rules = require('./webpack.rules');
const path = require('path');

rules.push({
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader'],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
