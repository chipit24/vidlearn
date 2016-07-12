import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/actions';

export default class _MainLayoutContainer extends Component {
  render() {
    let mainContent, menuBar;
    
    /* Show a loader until user status is known. If user is unauthed, uid will resolve
     to null instead of undefined */
    if (this.props.user.uid === undefined) {
      mainContent = <div className="fullscreenLoader"><img src="/img/loader.svg" /></div>;
    } else {
      mainContent = this.props.children;
    }
    
    if (this.props.user.uid) {
      menuBar = (
        <nav className="menuBar__nav">
          <Link className="menuBar__button" to="/" activeClassName="active" onlyActiveOnIndex={true}>
            <i className="fa fa-video-camera" aria-hidden="true"></i>
            <span className="text">Videos</span>
          </Link>
          <Link className="menuBar__button" to="/account" activeClassName="active">
            <i className="fa fa-user" aria-hidden="true"></i>
            <span className="text">Account</span>
          </Link>
          <a href='javascript:;' className="menuBar__button" onClick={this.props.logout}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <span className="text">Log Out</span>
          </a>
        </nav>
      );
    }
    
    return (
      <div className="appRoot">
        <div className="menuBar">
          <div className="menuBar__items">
            <img src="/img/logo.png" className="logo" />
            {menuBar}
          </div>
        </div>
        
        <div className="layoutContainer">
          {mainContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(_MainLayoutContainer);