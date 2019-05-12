import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
import ResponseCheck from "./ResponseCheck";

const Hot = hot(ResponseCheck); // hoc

ReactDom.render(<Hot />, document.querySelector("#root"));
