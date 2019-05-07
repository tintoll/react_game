// jsx 문법이 들어간거는 확장자를 .jsx로 만들어준다.
// jsx문법을 안쓴거랑 구분을 짓기 위해서
const React = require("react");
const ReactDom = require("react-dom");

// react-hot-loader 적용
const { hot } = require("react-hot-loader/root"); // 맨마지막에 /root를 꼭붙여야 한다.
const WordRelay = require("./WordReplyHook");
const Hot = hot(WordRelay); // hoc

ReactDom.render(<Hot />, document.querySelector("#root"));
