// const React = require("react");
// const ReactDom = require("react-dom");
// const { hot } = require("react-hot-loader/root"); // 맨마지막에 /root를 꼭붙여야 한다.
// const NumberBaseball = require("./NumberBaseball");
import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
import NumberBaseball from "./NumberBaseball";

const Hot = hot(NumberBaseball); // hoc

ReactDom.render(<Hot />, document.querySelector("#root"));
