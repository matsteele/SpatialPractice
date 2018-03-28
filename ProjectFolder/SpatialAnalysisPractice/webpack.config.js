// const path = require('path');

var webpack = require("webpack");

module.exports = {
    entry: __dirname + "/js/entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "assets"
    },
    module: {
        rules: [{
            test: /\.js$/,
            // loader: ["babel-loader"],
            // query: {
            //   presets: ['env']
            // }
        }]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        // test: /\.xxx$/, // may apply this only for some modules
        options: {
          mode: "development"
        },
        // query: {
        //   presets: ['env']
        // }
      })
    ]
    // mode: 'development',
    // devtool: 'source-map',
}
