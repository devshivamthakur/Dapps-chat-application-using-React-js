import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Global } from "@emotion/react";

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CometChat } from '@cometchat-pro/chat';

import { CometChatAvatar } from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src';
import { COMETCHAT_CONSTANTS } from '../../consts';

import {
  wrapperStyle,
  errorStyle,
  titleStyle,
  subtitleStyle,
  userContainerStyle,
  userWrapperStyle,
  thumbnailWrapperStyle,
  uidWrapperStyle,
  inputWrapperStyle,
  loginBtn,
} from "./style";

import { loaderStyle } from "./loader";

import * as actions from '../../store/action';

class Register extends React.PureComponent {

  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.mynamref=React.createRef()
  }

  login = (uid) => {
    if (!uid) {
      uid = this.myRef.current.value;
    }
   if(this.mynamref.current.value==undefined||this.mynamref.current.value==""){
    alert("Please enter a valid name.")

   }

    // Log the name to the console
    let authKey = COMETCHAT_CONSTANTS.AUTH_KEY;
    var uid = uid || this.myRef.current.value;

    var user = new CometChat.User(uid);
    user.setName(this.mynamref.current.value);
    CometChat.createUser(user, authKey).then(
      user => {
        alert("User created Successfully.");
        window.location.href = "/login"
      }, error => {

        console.log("error", error);
        alert(error.message)
      }
    )



  }

  render() {

    let loader = null;
    if (this.props.loading) {
      loader = (<div className="loading">Loading...</div>);
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (<p css={errorStyle()}>{this.props.error.message}</p>);
    }

    let authRedirect = null;
    if (this.props.isLoggedIn) {
      authRedirect = <Redirect to="/" />
    }

    return (
      <React.Fragment>
        <Global styles={loaderStyle} />
        <div css={wrapperStyle()}
         style={{
			
          background: 'linear-gradient(to right, #DECBA4, #3E5151)',
          height: '100vh',
        }}
        >
          {authRedirect}
          {loader}
          {errorMessage}
          <p css={titleStyle()}>Dapps chat App</p>

          <div css={uidWrapperStyle()}>
            <div>
              <p css={subtitleStyle()}>Register with UID</p>
            </div>
            <div css={inputWrapperStyle()}>
              <input ref={this.myRef} type="text" placeholder="Enter your UID here" />
            </div>
            <div>
              <p css={subtitleStyle()}>Enter your name </p>
            </div>
            <div css={inputWrapperStyle()}>
              <input ref={this.mynamref} type="text" placeholder="Enter your name here" />
            </div>
            <div css={loginBtn()}><button type="button" onClick={() => this.login()}>Register</button></div>
            <div


              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,

              }}

            >
              <button type="button" onClick={() => {
                window.location.href = "/login"

              }}>Already have account?Login</button>

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (uid, authKey) => dispatch(actions.auth(uid, authKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
