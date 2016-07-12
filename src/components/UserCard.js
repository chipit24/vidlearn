import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserCard extends Component {
  render() {
    return (
      <div>
        <div>Name: {this.props.user.name}</div>
        <div>Email: {this.props.user.email}</div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);