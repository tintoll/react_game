const React = require("react");
const { useState, useRef } = React;

const WordReplyHook = () => {
  const [word, setWord] = useState("화니");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const onRefInput = useRef(null);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue("");
      setResult("정답");

      onRefInput.current.focus();
    } else {
      setValue("");
      setResult("땡");
      onRefInput.current.focus();
    }
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmit}>
        <input ref={onRefInput} value={value} onChange={onChange} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordReplyHook;
