const HtmlWebpackPlugin = require("html-webpack-plugin")

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
})

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: './dist/main.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: { loader: "babel-loader" },
    }, {
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ],
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ]
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./dist/fonts",
        },
      }],
    }],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [htmlPlugin],
}