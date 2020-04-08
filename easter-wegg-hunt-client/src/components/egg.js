import React, { Component } from 'react';

export default class Egg extends Component {
  render() {
    const eggName = "egg"+this.props.name;
    return(
      <button id={eggName} onClick={test}>egg</button>
    );
  }
}
