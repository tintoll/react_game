import React, { useState, useRef } from "react";

const ResponseCheckHooks = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭하여 시작하세요");
  const [result, setResult] = useState([]);

  const timeout = useRef();
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = e => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");

      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");

        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
    } else if (state === "ready") {
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage("너무 성급하시군요. 녹색일때 클릭하여 주세요");
    } else if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭하여 시작하세요");
      setResult(prevResult => [
        ...prevResult,
        endTime.current - startTime.current
      ]);
    }
  };

  const onReset = () => {
    setResult([]);
  };
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          평균시간 :{result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheckHooks;
