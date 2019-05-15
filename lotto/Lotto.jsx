import React, { Component } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  // Array(45)의 공간을 만든다.
  // Array(45).fill() ->undefined로 채워준다.
  // 1~45까지 숫자 배열을 리턴해준다.
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    // 랜덤 숫자를 얻은다음 소수점을 버린 값을 candidate에서 삭제 하여주고
    // shuffle에 넣어준다.
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  // 마지막 값을 보너스 값으로 지정한다.
  const bonusNumber = shuffle[shuffle.length - 1];
  // 6자리만 잘라낸후에 정렬을 해서 담청 숫자들 배열을 리턴 받는다.
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}
class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 담청 숫자들
    winBalls: [],
    bonus: null, // 보너스공
    redo: false
  };

  timeouts = [];
  runTimeouts = () => {
    const { winNumbers } = this.state;
    // let으로 선언해주면 setTimeout 비동기 함수에서 클로져 문제가 안생김
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState(prevState => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]]
          };
        });
      }, (i + 1) * 1000); // 첫번째꺼는 1초후, 2번째거는 2초후
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true
      });
    }, 7000);
  };
  componentDidMount() {
    console.log("didMount");
    this.runTimeouts();
    console.log("로또 숫자를 생성합니다.");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    if (this.timeouts.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach(v => clearTimeout(v));
  }
  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(), // 담청 숫자들
      winBalls: [],
      bonus: null, // 보너스공
      redo: false
    });

    this.timeouts = [];
  };
  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>담청 숫자</div>
        <div id="result">
          {winBalls.map(v => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스 숫자</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한번더</button>}
      </>
    );
  }
}

export default Lotto;
