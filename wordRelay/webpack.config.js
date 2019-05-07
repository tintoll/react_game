const path = require("path");
const webpack = require("webpack");

module.exports = {
  name: "wordreply webpack setting",
  mode: "development", // production
  devtool: "eval",
  // 디버깅하기 위해서 eval 사용하는데 여러파일을 합쳤을때 에러난 위치를 알려줌,
  // 운영에서는 min으로 만드는데 위치를 알기 위해서 원본정보를 가지고있는 souce-map 사용, 보안을 위해서 hidden-source-map이 주로 사용됨.

  resolve: {
    extensions: [".js", ".jsx"]
  },

  entry: {
    // client에서 WordRelay를 가져오기때문에 client만 정의해줘도 webpack에서 알아서 변환해준다.
    // resolve에서 확장자를 지정해주면 아래에는 확장자를 빼도된다.
    // app: ["./client.jsx", "./WordReply.jsx"]
    app: "./client.jsx"
  }, // 입력

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

  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/"
  } // 출력
};
