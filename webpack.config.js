const path = require("path");

module.exports = {
  context: __dirname,
  devtool: "cheap-eval-source-map",
  target: "web",
  mode: process.env.NODE_ENV,
  entry: ["babel-polyfill", "./src/index.jsx"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist")
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  devServer: {
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000"
    },
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
