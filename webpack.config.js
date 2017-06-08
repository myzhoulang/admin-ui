const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
  entry: {
    "admin-ui": [path.join(__dirname, "./scss/index.js"), hotMiddlewareScript]
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            }, {
              loader: "sass-loader",
              options: {
                outputStyle: "expanded"
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: "[name].css"}),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),

  ]
}
