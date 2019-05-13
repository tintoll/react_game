import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
import RSPHooks from "./RSPHooks";

const Hot = hot(RSPHooks); // hoc

ReactDom.render(<Hot />, document.querySelector("#root"));
