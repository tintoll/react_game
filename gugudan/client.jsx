const React = require("react");
const ReactDom = require("react-dom");

const { hot } = require("react-hot-loader/root"); // 맨마지막에 /root를 꼭붙여야 한다.
const GuGuDan = require("./GuGuDan");
const Hot = hot(GuGuDan); // hoc

ReactDom.render(<Hot />, document.querySelector("#root"));
