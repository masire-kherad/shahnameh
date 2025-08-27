const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Force Metro to resolve tslib to its CommonJS build
config.resolver.extraNodeModules = {
  tslib: path.resolve(__dirname, "node_modules/tslib/tslib.js"),
};

module.exports = config;
