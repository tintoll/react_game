const React = require("react");
const { Component } = React;
class WordReply extends Component {
  state = {
    text: "Hello WordReply"
  };

  render() {
    return <div>{this.state.text}</div>;
  }
}

module.exports = WordReply;
