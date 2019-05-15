import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
import LottoHooks from "./LottoHooks";

const Hot = hot(LottoHooks); // hoc

ReactDom.render(<Hot />, document.querySelector("#root"));
