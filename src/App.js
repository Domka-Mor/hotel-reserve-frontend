import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthContext from './auth-context';
import AuthPage from './pages/Auth/AuthPage';
import Bookings from './pages/Bookings';
import UserRoute from './components/UserRoute';


class App extends Component {
 
 state = {
    token: null,
    userId: null,
    loading: true
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  componentDidMount() {
    this.fakeRequest().then(() => {
      const el = document.querySelector(".container1");
      if (el) {
        el.remove();  // removing the spinner element
        this.setState({ loading: false }); // showing the app
      }
    });
  }

  fakeRequest = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 5000));
  };

  render() {
    
    if (this.state.loading) {
      return null; //app is not ready (fake request is in process)
    }

    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
              <Switch>
                  <Route exact path='/' component={Home}/>                 
                  <Route exact path="/auth" component={AuthPage} />                  
                  <Route exact path='/rooms/' component={Rooms}/>
                  <Route exact path='/rooms/:slug' component={SingleRoom}/>
                  <UserRoute exact path="/bookings" component={Bookings} />
                  <Route component={Error}/>
              </Switch>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
