const path = require("path"); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require("webpack"); // eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require("html-webpack-plugin"); // eslint-disable-line import/no-extraneous-dependencies

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: dev ? "development" : "production",
  devtool: "source-map",
  entry: {
    app: "./src/index2.tsx",
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "build"),
    //publicPath: "/build/",
    filename: "[name].bundle.js",
  },
  devServer: {
    allowedHosts: "all", // ["0.0.0.0"],
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
  },
  optimization: {
    emitOnErrors: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
      },
    }),
    new MiniCssExtractPlugin({ filename: "styles.css" }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          //{ loader: "ts-loader" },
          {
            loader: require.resolve("@linaria/webpack5-loader"),
            options: { sourceMap: dev },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "css-hot-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: dev },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
};
