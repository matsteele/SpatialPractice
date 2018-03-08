// const path = require('path');

var webpack = require("webpack");

module.exports = {
    entry: __dirname + "/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "assets"
    },
    // devServer: {
    //     inline: true,
    //     contentBase: __dirname + "/dist",
    //     port: 3000
    // },
    module: {
        rules: [{
            test: /\.js$/,
            loader: ["babel-loader"],
            // query: {
            //   presets: ['env']
            // }
        }]
    },
    mode: 'development',
    // devtool: 'source-map',
}

// const path = require('path');
//
// module.exports = {
//   entry: './index.js',
//   output: {
//     filename: './bundle.js',
//   },
//   module: {
//     loaders: [
//       {
//         test: [/\.jsx?$/],
//         exclude: /(node_modules)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['env']
//         }
//       }
//     ]
//   },
//   devtool: 'source-map',
//   resolve: {
//     extensions: ['.js', '.jsx', '*']
//   }
// };

// module.exports = {
//  entry: "./index.js",
//  output: {
//    path: __dirname,
//    filename: "./bundle.js"
//     },
//  devtool: "source-map",
//  // test: [/\.css$/],
//  loader: "style-loader!css-loader",
//  module: {
//     loaders: [
//         {
//           // test: path.join(__dirname, 'es6'),
//           loader: 'babel-loader'
//         }
//     ]
//   }
// };

// module.exports = {
//  entry: "./index.js",
//   output: {
//    filename: "./bundle.js"
//   },
//   module: {
//     loaders: [
//       {
//         test: [/\.jsx?$/],
//         exclude: /(node_modules)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['env']
//         }
//       }
//     ]
//   },
//   devtool: 'source-map',
//   resolve: {
//     extensions: ['.js', '.jsx', '*']
//   }
// };
