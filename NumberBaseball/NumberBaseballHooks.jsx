import React, { useState } from "react"; // ES6
import Try from "./Try";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseballHooks = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answers, setAnswers] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = e => {
    e.preventDefault();
    // 4개의 숫자가 다 맞으면
    if (value === answers.join("")) {
      setResult("홈런!");
      setTries(prevTries => {
        return [...prevTries, { try: value, result: "홈런!" }];
      });

      alert("게임을 다시 시작합니다!");
      setValue("");
      setAnswers(getNumbers());
      setTries([]);
    } else {
      // 답 틀렸으면

      // 입력한 값을 배열로 만든다.
      const answerArray = value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀렸을 때
        setResult(`10번 넘게 틀려서 실패! 답은 ${answers.join(",")}였습니다!`);
        alert("게임을 다시 시작합니다!");
        setValue("");
        setAnswers(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answers[i]) {
            strike += 1;
          } else if (answers.includes(answerArray[i])) {
            ball += 1;
          }
        }

        setValue("");
        setTries(prevTries => {
          return [
            ...prevTries,
            { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다` }
          ];
        });
      }
    }
  };

  const onChangeInput = e => {
    console.log(answers);
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>시도 횟수 : {tries.length} </div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 :`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseballHooks; // ES6
