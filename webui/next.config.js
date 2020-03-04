const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const path = require("path");
const withCustomBabelConfigFile = require("next-plugin-custom-babel-config");
const withTranspileModules = require("next-transpile-modules")(['@armory']);

module.exports = withCSS(withSass(withCustomBabelConfigFile(withTranspileModules({
    cssModules: true,
    babelConfigFile: path.resolve("../babel.config.js"),
    sassLoaderOptions: {},
    webpack (config) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'sass-loader',
                options: {
                    limit: 100000
                }
            }
        });

        return config;
    }
}))));