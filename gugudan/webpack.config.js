const path = require("path");

module.exports = {
  name: "gugudan webpack setting",
  mode: "development", // production
  devtool: "eval",
  resolve: {
    extensions: [".jsx", ".js"]
  },

  entry: {
    app: "./client.jsx"
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            // "@babel/preset-env", // option 설정을 안했을때
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"] //한국에서 1프로이상인 브라우저가 돌아가도록 설정. browserlist로 검색하면 나옴.
                },
                debug: true
              }
            ],
            "@babel/preset-react"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-hot-loader/babel"
          ]
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/"
  }
};
