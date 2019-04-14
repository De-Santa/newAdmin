import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import * as T from 'prop-types';
import { db, firebase } from 'src/firebase.db';

const propTypes = {
  children: T.node.isRequired
};

const initialState = {
  authorized: false,
  authError: null,
  authInProgress: false,
  userData: {}
};

const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_IN = 'AUTH_IN';
const AUTH_OUT = 'AUTH_OUT';
const AUTH_START = 'AUTH_START';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case AUTH_START:
      return { ...initialState, authInProgress: true };
    case AUTH_IN:
      return { ...state, authorized: true, authInProgress: false, userData: payload };
    case AUTH_OUT:
      return { ...initialState };
    case AUTH_ERROR:
      return { ...initialState, authError: payload };
    default:
      throw new Error();
  }
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /** firebase listener on login/logout */
  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        dispatch({ type: AUTH_OUT });
        return;
      }

      /** if user not exist save him to database on login success */
      const userDocRef = db.collection('users').doc(firebaseUser.uid);
      userDocRef.get()
        .then(doc => {
          if (!doc.exists) {
            userDocRef.set(
              {
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                emailVerified: firebaseUser.emailVerified,
                photoURL: firebaseUser.photoURL,
                uid: firebaseUser.uid
              },
              { merge: true }
            ).then(() => {
              dispatch({
                type: AUTH_IN,
                payload: {
                  displayName: firebaseUser.displayName,
                  photoURL: firebaseUser.photoURL,
                  uid: firebaseUser.uid
                }
              });
            });
          } else {
            dispatch({
              type: AUTH_IN,
              payload: {
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                uid: firebaseUser.uid
              }
            });
          }
        })
        .catch((error) => {
          dispatch({ type: AUTH_ERROR, payload: error.message });
        });
    });
  },
  []
  );

  const logIn = useCallback(
    async (authProvider) => {
      dispatch({ type: AUTH_START });
      let provider;

      switch (authProvider) {
        case 'google':
          provider = new firebase.auth.GoogleAuthProvider();
          try {
            await firebase.auth().signInWithPopup(provider);
          } catch (error) {
            dispatch({ type: AUTH_ERROR, payload: error.message });
          }
          break;
        default: throw new Error(
          'logIn should use one of auth providers as argument: "google"'
        );
      }
    },
    []
  );

  const logOut = useCallback(
    () => {
      firebase.auth().signOut();
    },
    []
  );

  return (
    <AuthContext.Provider value={[state, logIn, logOut]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = propTypes;

export { AuthContext, AuthProvider };
