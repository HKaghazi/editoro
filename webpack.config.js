const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.ts",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".ts"],
  },
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   // new HtmlWebpackPlugin({
  //   //   title: "Editoro",
  //   // }),
  // ],
  output: {
    filename: "editoro.js",
    path: path.resolve(__dirname, "dist"),
    library: ["Editoro"],
    libraryTarget: "umd",
  },
};
