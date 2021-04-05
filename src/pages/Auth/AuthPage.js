import React, { Component } from 'react';
import AuthContext from '../../auth-context';
import './Auth.css';
import NavbarReserve from '../../components/Navbars/NavbarReserve';



class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
    }

    fetch('https://hotel-reserve-back.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
        this.props.history.push('/rooms');
        console.log('prihlaseny');
      })
      .catch(err => {
        console.log(err);

      });
  };

  render() {
    return (
      <>
      <NavbarReserve/>
      <section className='auth'>
        <div className="color"></div>
        <div className='box-auth'>
          <div className='square' style={{"--i":0}}></div>
          <div className='square' style={{"--i":1}}></div>
          <div className='square' style={{"--i":2}}></div>
          <div className='square' style={{"--i":3}}></div>
          <div className='square' style={{"--i":4}}></div>
          <div className='container-auth'>
            <div className='form-auth'>
              <h2 className='text-center'>{this.state.isLogin ? 'Login' : 'Sign Up'}</h2>
              <form>
                <div className='inputBox'>
                  <input type='email' placeholder='Email' id='email' ref={this.emailEl}/>
                </div>
                <div className='inputBox'>
                  <input type='password' placeholder='Password' id='password' ref={this.passwordEl}/>
                </div>
                <div className='inputBox text-center'>
                  <button className='auth-btn' onClick={this.submitHandler}>Submit</button>
                </div>
                {this.state.isLogin ?
                  (<p className='forget text-center' onClick={this.switchModeHandler}>Don't have an account? <strong>Sign up</strong></p>)
                  : 
                  (<p className='forget text-center' onClick={this.switchModeHandler}>Have an account? <strong>Login</strong></p>)
                }
              </form>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }
}

export default AuthPage;