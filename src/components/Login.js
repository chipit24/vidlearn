import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Login extends Component {
  render() {
    return (
      <div className="loginFormContainer">
        <div className="flexBlock flexBlock--text slabo">
        <h3>Welcome to Vidlearn!</h3>
          <Link to="/signup" className="loginForm__button loginForm__button--signup mb-15">
            <span>Get started for free!</span>
          </Link>
          
          <p>
            Vidlearn is an advanced, fast, real-time video analytics tool built
            for the modern web.
          </p>
        </div>
      
        <div className="flexBlock flexBlock--form slabo">
          <button className="loginForm__button loginForm__button--facebook">
            <span>Log in with Facebook</span>
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </button>
        
          <button className="loginForm__button loginForm__button--google">
            <span>Log in with Google</span>
            <i className="fa fa-google" aria-hidden="true"></i>
          </button>
        
          <hr style={{ margin: '15px 0' }} />
        
          <form>
            <label for="email" className="loginForm__input">
              Email<br/>
              <input id="email"
                     type="email"
                     required
                     placeholder="Email"/>
            </label>
            
            <label for="password" className="loginForm__input">
              Password<br/>
              <input id="password"
                     type="password"
                     required
                     placeholder="Password "/>
            </label>
            
            <button className="loginForm__button loginForm__button--submit">
              <span>Log in</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
