import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jQuery from 'jquery';

import Instagram from './components/instagram';
import Login from './components/login';
import Lobby from './components/host/lobby'
import Loading from './components/player/loading'
import { subscribeToTimer } from './components/api';

var params = jQuery.param(window.location.pathname);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: "http://localhost:4001"
    };
    subscribeToTimer((err, timestamp) => this.setState({
    timestamp
  }));
  }

  //server -> client
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    //socket.on("FromAPI", data => this.setState({ response: data }));
    socket.emit("host-join", params);
    socket.on('showGamePin', data => this.setState({ response: data }));
  }

  render() {
    /*const { response } = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          {response
              ? <p>
                The temperature in Florence is: {response} °F
                <Login />
              </p>
              : <p>Loading...</p>}
        </div>
    );*/
    return (
       <BrowserRouter>
        <div>
            This is the timer value: {this.state.timestamp}
            <Switch>
             <Route path="/" component={Login} exact/>
             <Route path="/lobby" component={Lobby}/>
             <Route path="/instagram" component={Instagram}/>
             <Route path="/loading" component={Loading}/>
            <Route component={Error}/>
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
