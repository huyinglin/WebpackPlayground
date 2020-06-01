const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['react', 'react-dom', 'lodash'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]',
  },
};
