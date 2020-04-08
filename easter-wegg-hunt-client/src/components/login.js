import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Login extends Component {
  render() {
    return(
      <div>
        <h1>Easter Wegg Hunt!</h1>
        <button><NavLink to="/lobby">Host a Game</NavLink></button>
        <button><NavLink to="/loading">Join a Game</NavLink></button>
        <h5>about | how to play</h5>
      </div>
    );
  }
}
