const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  output: {
    clean: true, // Clean the output directory before emit
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(png|jpe?g|atlas)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { // не копируем изображения в папках
          from: "src/assets/images/*",
          to: "assets/images/[name][ext]"
        },
        {
          from: "src/assets/sounds",
          to: "assets/sounds"
        },
        {
          from: "src/assets/fonts",
          to: "assets/fonts"
        },
      ],
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
}
