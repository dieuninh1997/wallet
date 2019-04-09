const extraNodeModules = require('node-libs-react-native');
const blacklist = require('metro/src/blacklist');

module.exports = {
  extraNodeModules,
  getBlacklistRE() {
    return blacklist([
      /nodejs-assets\/.*/,
      /android\/.*/,
      /ios\/.*/,
    ]);
  },
};
