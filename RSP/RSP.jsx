import React, { PureComponent } from "react";

const rspCoords = {
  가위: "0",
  바위: "-142px",
  보: "-284px"
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1
};

const computerChoice = imgCoord => {
  // Object.entries()는 object에 직접있는 enumerable 속성 [key, value] 쌍에 해당하는 배열을 반환합니다.
  // 속성의 순서는 개체의 속성 값을 수동으로 반복하여 주어진 순서와 동일합니다.
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

// 라이프 사이클
// constructor -> render -> ref -> componentDidMount(비동기 요청)  -> (setState/props바뀔때 )
// -> shouldComponentUpdate(true) -> render -> componentDitUpdate -> 부모가 나를 없앴을때 -> componentWillUnmount(비동기 요청 정리) -> 소멸

class RSP extends PureComponent {
  state = {
    result: "",
    imgCoord: rspCoords.바위,
    score: 0
  };

  interval;
  componentDidMount() {
    // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
    this.interval = setInterval(this.changeHand, 100);
  }

  componentWillUnmount() {
    // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state; // setInterval이 비동기이기 때문에 함수 안에 선언 해줘야한다.
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위
      });
    }
  };

  onClickBtn = choice => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다!"
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState(prevState => {
        return {
          result: "이겼습니다!",
          score: prevState.score + 1
        };
      });
    } else {
      this.setState(prevState => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  };
  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`
          }}
        />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;
