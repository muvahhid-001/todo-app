import React, { Component } from 'react';
import './button-timer.css';

export default class ButtonTimer extends Component {
  state = {
    classNames: 'button_tg play',
    min: this.props.min,
    sec: this.props.sec,
  };

  timer = () => {
    this.setState((prevState) => {
      if (prevState > 0) {
        return { sec: prevState - 1 };
      } else {
        clearInterval(this.interval);
        return { sec: 0 };
      }
    });
  };

  changeClass = () => {
    if (this.state.classNames === 'button_tg play') {
      this.setState({
        classNames: 'button_tg pause',
      });
    } else {
      this.setState({
        classNames: 'button_tg play',
      });
    }
  };

  render() {
    return <button className={this.state.classNames} onClick={this.timer}></button>;
  }
}
