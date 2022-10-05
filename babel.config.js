module.exports = {
  //presets: ["@babel/preset-react"],
  presets: [
    //"@babel/preset-env",
    //"@babel/preset-react",
    //"@babel/preset-typescript",
    //"@linaria",

    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",

    //"@babel/preset-env",
    //"@babel/preset-typescript",
    //"@babel/preset-react",
    //"@linaria",
    //"@babel/preset-react",
    //"@babel/typescript",
  ],
};

// https://gist.github.com/fedek6/c2a9257c1fdbf8db5973b8560354843e
