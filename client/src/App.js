import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom'
import Register from './auth/Register';
import Login from './auth/Login';
import JokesList from './jokes/JokesList';
import { withRouter } from 'react-router-dom';

import Home from './components/Home';

class App extends Component {
  logout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dad Jokes 2.1</h1>
        </header>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
        <Link to="/jokes">Jokes list</Link>
        <button onClick={this.logout}>Log out</button>
        <Route exact path="/" component={Home} />
        <Route path="/register" render={props => (<Register {...props} />)} />
        <Route path="/login" render={props => (<Login {...props} />)} />
        <Route path="/jokes" render={props => (<JokesList {...props} />)} />
      </div>
    );
  }
}

export default withRouter(App);
