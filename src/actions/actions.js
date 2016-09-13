import firebase from 'firebase';
import { browserHistory } from 'react-router'
// require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();

let config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket
};
firebase.initializeApp(config);
let auth = firebase.auth();
let database = firebase.database();

/* Authentication actions */

export function startListeningToAuth() {
  return function (dispatch) {
    auth.onAuthStateChanged(user => {
      if (user) {
        database.ref(`users/${user.uid}`).once('value', snapshot => {
          if (snapshot.val()) {
            let user = {
              email: snapshot.val().email,
              name: snapshot.val().name,
              uid: user.uid
            };
            
            dispatch(login(user));
          } else {
            dispatch(logout());
          }
        }, err => {
          console.log(err);
        });
      } else {
        dispatch(logout());
      }
    });
  };
}

export function beingSignup() {
  return {
    type: 'BEGIN_SIGNUP'
  };
}

export function login(userInfo) {
  return {
    type: 'LOGIN',
    payload: userInfo
  };
}

export function logout() {
  return function (dispatch) {
    auth.signOut();
    
    if (!['/login', '/signup'].includes(window.location.pathname)) {
      /* Only go to the login page if we're not already on the login or
       signup page */
      browserHistory.push('/login');
    }
    
    dispatch({ type: 'LOGOUT' });
  };
}

export function signup(userInfo) {
  return function (dispatch) {
    dispatch(beingSignup());
    
    auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then(user => {
      dispatch({ type: 'LOGIN', payload: user });
    }, error => {
      console.error(error.code);
      alert(error.message);
      dispatch({ type: 'LOGOUT' });
    });
    
    // return base.createUser(userInfo, (error, firebaseUserData) => {
    //   if(error) {
    //     dispatch(logout());
        
    //     switch (error.code) {
    //       case "EMAIL_TAKEN":
    //         window.alert('The new user account cannot be created because the email is already in use.');
    //         break;
    //       case "INVALID_EMAIL":
    //         window.alert('The specified email is not a valid email.');
    //         break;
    //       default:
    //         window.alert('Error creating user.');
    //     }
    //   } else {
    //     /* User successfully created, log them in */
    //     base.authWithPassword(userInfo, (error, authData) => {
    //       if (error) {
    //         dispatch(logout());
    //         window.alert('Login failed.');
    //       } else {
    //         /* Create an entry with the key as the user's uid in the users collection */
    //         let user = {
    //           email: userInfo.email,
    //           name: userInfo.name,
    //           uid: authData.uid
    //         };
            
    //         base.push(`users/${authData.uid}`, {
    //           data: user,
    //           then() {
    //             /* Save logged in status to localStorage */
    //             window.localStorage.setItem('user', JSON.stringify(user));
                
    //             dispatch(login(user));
    //             browserHistory.push('/');
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
  };
}