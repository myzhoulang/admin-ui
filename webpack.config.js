const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    "admin-ui": path.join(__dirname, "./scss/index.js")
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
            { loader: "css-loader" },
            { loader: "sass-loader", options: { outputStyle: "expanded" } }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css"
    })
  ]
}