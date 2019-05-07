const React = require("react");
const { Component } = React;
class WordReply extends Component {
  state = {
    word: "제로초",
    value: "",
    result: ""
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        word: this.state.value,
        value: "",
        result: "정답"
      });
      this.input.focus();
    } else {
      this.setState({
        value: "",
        result: "땡"
      });
      this.input.focus();
    }
  };

  input;
  onRefInput = c => {
    this.input = c;
  };
  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChange}
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordReply;
