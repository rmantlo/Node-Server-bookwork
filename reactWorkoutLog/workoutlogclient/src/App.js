import React, { Component } from 'react';
//import './App.css';
import SiteBar from './home/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './auth/Auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: ''
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token })
    }
  }

  setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token })
  }

  logout = () =>{
    this.setState({
      sessionToken: ''
    });
    localStorage.clear();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <SiteBar clickLogout={this.logout}/>
          <Auth setToken={this.setSessionState} />
        </div>
      </Router>
    );
  }
}

export default App;
