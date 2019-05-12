import React, { PureComponent } from "react";

class ResponseCheck extends PureComponent {
  state = {
    state: "waiting",
    message: "클릭하여 시작하세요",
    result: []
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = e => {
    const { state } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요"
      });

      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭"
        });

        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
    } else if (state === "ready") {
      clearTimeout(this.timeout);

      this.setState({
        state: "waiting",
        message: "너무 성급하시군요. 녹색일때 클릭하여 주세요"
      });
    } else if (state === "now") {
      this.endTime = new Date();
      this.setState(prevSate => {
        return {
          state: "waiting",
          message: "클릭하여 시작하세요",
          result: [...prevSate.result, this.endTime - this.startTime]
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: []
    });
  };
  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>
          평균시간 :
          {this.state.result.reduce((a, c) => a + c) / this.state.result.length}
          ms
        </div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
