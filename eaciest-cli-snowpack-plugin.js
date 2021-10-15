const eaciestCli = require('eaciest-cli');
const get_config = require('eaciest-cli/get-config');
const minimatch = require('minimatch');

module.exports = (snowpackConfig, pluginOptions = {}) => {

  const config = {
    ...get_config(pluginOptions.configFile),
    ...(pluginOptions.config || {}),
  };

  eaciestCli({
    ...config,
    watch: false,
  });

  return {
    name: 'eaciest-watcher',
    onChange ({ filePath }) {
      if (minimatch(filePath, config.glob)) {
        eaciestCli.handleSystemFile(filePath, config);
      }
    },
  };
};
