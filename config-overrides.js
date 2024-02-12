const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      constants: path.resolve(__dirname, 'src/constants'),
      hoc: path.resolve(__dirname, 'src/hoc'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      interfaces: path.resolve(__dirname, 'src/interfaces'),
      pages: path.resolve(__dirname, 'src/pages'),
      store: path.resolve(__dirname, 'src/store'),
      theme: path.resolve(__dirname, 'src/theme'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  };

  return config;
};
