# react_game

- 제로초님의 리액트 기초를 배우면서 간단한 게임을 만들자

```shell
// 아무옵션을 안주면 --save랑 같이 동작
$ npm i react react-dom

// -D 옵션은 --save-dev랑 같다
$ npm i -D webpack webpack-cli

// jsx문법을 해석하지 못하기때문에 바베일 설치하여 webpack에 설정한다.
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader

// state = {}를 해석하지 못해서 추가
npm i -D @babel/plugin-proposal-class-properties
```

#### webpack-dev-server and hot-loader적용

```javascript
// 설치
$ npm i -D webpack-dev-server react-hot-loader

// webpack.config.js module 설정 에 plugin추가
plugins: [
  "@babel/plugin-proposal-class-properties",
  "react-hot-loader/babel"
]

// ReactDom.render 부분에 hot으로 감싼 클래스를 넘겨준다.
const { hot } = require("react-hot-loader/root"); // 맨마지막에 /root를 꼭붙여야 한다.
const WordRelay = require("./WordReply");
const Hot = hot(WordRelay);
ReactDom.render(<Hot />, document.querySelector("#root"));

// package.json scripts에 webpack-dev-server 설정 해준다.
"scripts": {
  "dev": "webpack-dev-server --hot"
},

```
