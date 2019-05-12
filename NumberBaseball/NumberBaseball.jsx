// const React = require("react");
import React from "react"; // ES6
import { PureComponent } from "react";
import Try from "./Try";

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
// class밖으로 빼는 이유는 재사용할수 있는 부분이 있을 수 있어서이다.
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    // .splice()는 배열에서 특정 범위의 값들을 추출하고, 그 자리에 새로운 값을 넣습니다.
    // .splice(1,2, 'aa','bb') // 2번째 인데스의 값부터 2개추출하고 'aa'와 'bb'를 넣어 새로운 배열을 리턴한다.
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends PureComponent {
  state = {
    result: "",
    value: "",
    answers: getNumbers(), // ex: [1,3,5,7]
    tries: []
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { result, value, tries, answers } = this.state;
    // 4개의 숫자가 다 맞으면
    if (value === answers.join("")) {
      // setState에서 이전 state값을 사용하고 싶으면 아래와 같이 함수형태로 prevState 넘겨서 사용해주는 것이 좋다.
      this.setState(prevState => {
        return {
          result: "홈런!",
          // 아래 문법은 예전 배열값 넣고 두번째안자에 있는 새로운 값을 넣어주는 문법이다.
          // react에서는 배열 추가할때 push()를 사용하면 안된다.
          tries: [...prevState.tries, { try: value, result: "홈런!" }]
        };
      });
      alert("게임을 다시 시작합니다!");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: []
      });
    } else {
      // 답 틀렸으면

      // 입력한 값을 배열로 만든다.
      const answerArray = value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answers.join(",")}였습니다!`
        });
        alert("게임을 다시 시작합니다!");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: []
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answers[i]) {
            strike += 1;
          } else if (answers.includes(answerArray[i])) {
            ball += 1;
          }
        }

        this.setState(prevState => {
          return {
            tries: [
              ...prevState.tries,
              { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다` }
            ],
            value: ""
          };
        });
      }
    }
  };

  onChangeInput = e => {
    console.log(this.state.answers);
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput} />
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
  }
}

// module.exports = NumberBaseball;
export default NumberBaseball; // ES6
// export default 하나만 보낼수있다.
// export const hello = 'hello'; <-- 이렇게 보내면 아래와 같이 받을 수 있다.(여러개 가능) : 함수나 변수를 보낼때
// import { hello } from '';
