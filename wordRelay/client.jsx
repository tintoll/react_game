// jsx 문법이 들어간거는 확장자를 .jsx로 만들어준다.
// jsx문법을 안쓴거랑 구분을 짓기 위해서

const React = require("react");
const ReactDom = require("react-dom");

const WordRelay = require("./WordReply");

ReactDom.render(<WordRelay />, document.querySelector("#root"));
