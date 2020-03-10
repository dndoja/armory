const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const path = require("path");
const withCustomBabelConfigFile = require("next-plugin-custom-babel-config");
const withTranspileModules = require("next-transpile-modules")(['@armory']);

module.exports = withCustomBabelConfigFile(withTranspileModules({
    cssModules: true,
    babelConfigFile: path.resolve("../babel.config.js"),
    sassLoaderOptions: {},
}));