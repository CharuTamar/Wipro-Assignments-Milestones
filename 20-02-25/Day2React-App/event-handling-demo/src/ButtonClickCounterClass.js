import React, { Component } from "react";

class ButtonClickCounterClass extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // Event handler function
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h2>Button Click Counter (Class Component)</h2>
        <p>Button clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

export default ButtonClickCounterClass;