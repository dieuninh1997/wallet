const extraNodeModules = require('node-libs-react-native');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  extraNodeModules,
  getBlacklistRE() {
    return blacklist([
      /nodejs-assets\/.*/,
      /android\/.*/,
    ]);
  },
};
