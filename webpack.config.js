const path = require("path"); // eslint-disable-line import/no-extraneous-dependencies
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack"); // eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require("html-webpack-plugin"); // eslint-disable-line import/no-extraneous-dependencies
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin"); // eslint-disable-line import/no-extraneous-dependencies

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    allowedHosts: "all", //"local-ip", // "all",
    hot: true,
    liveReload: false,
    port: 3333,
    watchFiles: ["src/**/*"],
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
    new NodePolyfillPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          {
            loader: "@linaria/webpack-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
            },
          },
          /*{
          loader: "awesome-typescript-loader",
          options: {
          useBabel: true,
          useCache: true,
          cacheDirectory: ".cache/awesome-typescript-loader",
          },
          },
          {
          loader: "babel-loader",
          options: {
          exclude: /node_modules/,
          presets: [
          "@babel/preset-react",
          "@babel/preset-typescript",
          //["@babel/preset-env", { targets: { node: "14" } }],
          ],
          },
          },
          {
          loader: require.resolve("@linaria/webpack5-loader"),
          options: {
          sourceMap: isDev,
          },
          },
          {
          loader: "@linaria/webpack5-loader",
          },*/
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "css-hot-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        type: "asset/resource",
      },
      {
        test: /\.mp4$/,
        use: "file-loader?name=videos/[name].[ext]",
      },
    ],
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    fallback: {
      fs: false,
    },
  },
};

/*
  
 include: [
          path.resolve(__dirname, "app")
        ],




            //loader: require.resolve("@linaria/webpack5-loader"),
            //options: {
            //sourceMap: true,
            //babelOptions: {
            //presets: [
            //require.resolve("@babel/preset-env"),
            //require.resolve("@babel/preset-typescript"),
            //require.resolve("@linaria/babel-preset"),
            //],
            //},
            //},




          //
          //{
          //loader: "babel-loader",
          //options: {
          //presets: [
          //"@babel/preset-react",
          //["@babel/preset-env", { targets: { node: "14" } }],
          //],
          //},
          //},
          //{
          //loader: "babel-loader",
          //},
          //{
          //loader: "ts-loader",
          //},
          //{
          //loader: require.resolve("ts-loader"),
          //options: {
          //// disable type checker - we will use it in fork plugin
          //transpileOnly: true,
          //experimentalWatchApi: true,
          //},
          //},



  */
