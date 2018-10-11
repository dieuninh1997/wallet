const extraNodeModules = require('node-libs-react-native');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  extraNodeModules,
  getBlacklistRE: function() {
    return blacklist([
      /nodejs-assets\/.*/,
      /android\/.*/,
    ]);
  },
};
