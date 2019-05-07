const React = require("react");
const ReactDom = require("react-dom");

const { hot } = require("react-hot-loader");
const GuGuDan = require("./GuGuDan");
const Hot = hot(GuGudan);

ReactDom.render(<Hot />, document.querySelector("#root"));
