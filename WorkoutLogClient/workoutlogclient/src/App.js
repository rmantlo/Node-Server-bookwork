import React, { Component } from 'react';
import './App.css';
import Auth from './auth/Auth';
//import Splash from './home/Splash';
import WorkoutIndex from './workouts/WorkoutIndex';
import NavBar from './home/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';

class App extends Component {
  constructor() {
    super();
    this.setToken = (token) => {
      localStorage.setItem('token', token);
      this.setState({ sessionToken: token })
    }

    this.state = {
      sessionToken: '',
      setToken: this.setToken
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

  logout = () => {
    this.setState({
      sessionToken: ''
    });
    localStorage.clear();
  }

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Switch>
          <Route path='/' exact>
            {/* <Splash sessionToken={this.state.sessionToken} /> */}
            <WorkoutIndex />
          </Route>
        </Switch>
      )
    } else {
      return (
        <Route path='/auth' >
          <Auth />
          {/* removed setToken={this.setSessionState} from <Auth /> */}
        </Route>
      )
    }
  }

  render() {
    console.log(this.state.sessionToken)
    return (
      <Router>
        <AuthContext.Provider value={this.state}>
          <div className="App">
            <NavBar clickLogout={this.logout} />
            {this.protectedViews()}
          </div>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
