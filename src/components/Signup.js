import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { signup } from '../actions/actions';
import { USER_STATUS } from '../constants/constants';

class Singup extends Component {
  componentDidMount() {
    this.form = document.forms.signupForm;
    this.form.password.onchange = this.validatePassword;
    this.form.confirmPassword.onchange = this.validatePassword;
  }
  
  validatePassword = () => {
    if(this.form.password.value !== this.form.confirmPassword.value) {
      this.form.confirmPassword.setCustomValidity('Passwords do not match');
    } else {
      this.form.confirmPassword.setCustomValidity('');
    }
  }
  
  signup = event => {
    event.preventDefault();
    
    if(this.props.user.status !== USER_STATUS.CREATING) {
      let userInfo = {
        name: this.form.name.value,
        email: this.form.email.value,
        password: this.form.password.value,
        confirmPassword: this.form.confirmPassword.value
      };
      
      this.props.signup(userInfo);
    }
  }
  
  render() {
    let loadingClass;
    if (this.props.user.status === USER_STATUS.CREATING) {
      loadingClass = 'loginForm__button--loading';
    }
    
    return (
      <div className="loginFormContainer">
        <div className="flexBlock flexBlock--form slabo">
          <div className="flexBlock--text">
            <h3>Thank you for choosing Vidlearn!</h3>
            <p className="smallText">Fields marked with * are required.</p>
          </div>
        
          <form onSubmit={this.signup} id="signupForm">
            <label for="name" className="loginForm__input">
              Name<br/>
              <input id="name"
                     type="text"
                     placeholder="Full Name" />
            </label>
          
            <label for="email" className="loginForm__input">
              Email*<br/>
              <input id="email"
                     type="email"
                     required
                     placeholder="Email" />
            </label>
            
            <label for="password" className="loginForm__input">
              Password*<br/>
              <input id="password"
                     type="password"
                     required
                     placeholder="Password" />
            </label>
            
            <label for="confirmPassword" className="loginForm__input">
              Confirm Password*<br/>
              <input id="confirmPassword"
                     type="password"
                     required
                     placeholder="Confirm Password" />
            </label>
            
            <button className={`loginForm__button loginForm__button--signup ${loadingClass}`}>
              <span>Finish!</span><img src="/img/loader.svg" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: userInfo => dispatch(signup(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singup);