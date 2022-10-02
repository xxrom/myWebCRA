const path = require("path"); // eslint-disable-line import/no-extraneous-dependencies
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack"); // eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require("html-webpack-plugin"); // eslint-disable-line import/no-extraneous-dependencies

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index2.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  mode: isDev ? "development" : "production",
  devtool: "eval-source-map", // "source-map",
  devServer: {
    allowedHosts: "all", //"local-ip", // "all",
    hot: true,
    liveReload: false,
    port: 3333,
    static: {
      directory: path.resolve(__dirname, "src"),
    },
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
    isDev && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                ["@babel/preset-env", { targets: { node: "14" } }],
              ],
            },
          },
          //{ loader: "ts-loader" },
          {
            loader: require.resolve("@linaria/webpack5-loader"),
            options: { sourceMap: isDev },
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
            //options: { sourceMap: isDev },
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
