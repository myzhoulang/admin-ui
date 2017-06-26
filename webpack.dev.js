const path = require("path")
const webpack = require("webpack")

const publicPath = 'http://localhost:3001/'
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

module.exports = {
    entry: {
        "admin-ui": [path.join(__dirname, "./scss"), hotMiddlewareScript],
        "style": [path.join(__dirname, "./public/style.js"), hotMiddlewareScript]
    },
    devtool: "#source-map",
    output: {
        path: path.join(__dirname, "./public"),
        filename: "./[name].js",
        publicPath: publicPath
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ['style-loader',
                    'css-loader?sourceMap',
                    'resolve-url-loader',
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.(gif|jpe?g|png|woff|svg|eot|ttf|pdf)\??.*$/,
                use: "file-loader?name = [path][name].[ext]"
            }
        ]
    },

    plugins: [
        // new ExtractTextPlugin({
        //   filename: "stylesheets/[name].css",
        //   publicPath: path.join(__dirname, "./public/stylesheets/")
        // }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
