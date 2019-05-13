import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
import ResponseCheckHooks from "./ResponseCheckHooks";

const Hot = hot(ResponseCheckHooks); // hoc

ReactDom.render(<Hot />, document.querySelector("#root"));
