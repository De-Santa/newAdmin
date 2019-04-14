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
      /** if no user info came from observer it means logout */
      if (!firebaseUser) {
        dispatch({ type: AUTH_OUT });
        return;
      }
      /** get ref on firebase doc with user */
      const userDocRef = db.collection('users').doc(firebaseUser.uid);

      userDocRef.get()
        .then(doc => {
          /** if user exists get his data and dispatch login success */
          if (doc.exists) {
            dispatch({ type: AUTH_IN, payload: { ...doc.data() } });
            return;
          }
          /** if user not exist save him to database */
          const { displayName = '', email = '', photoURL = '', uid } = firebaseUser || {};

          userDocRef.set({ displayName, email, photoURL, uid, _version: 0 })
            .then(() => {
              /** after creation complete get new user data and dispatch login success */
              userDocRef.get().then((createdDoc) => {
                dispatch({ type: AUTH_IN, payload: { ...createdDoc.data() } });
              });
            });
        })
        .catch((error) => {
          dispatch({ type: AUTH_ERROR, payload: error.message });
        });
    });
  },
  []
  );

  const logIn = useCallback(
    async (authProvider, credentials = {}) => {
      const { email, password } = credentials;
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
        case 'email':
          provider = new firebase.auth.EmailAuthProvider();
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            switch (error.code) {
              case ('auth/user-not-found'):
                try {
                  await firebase.auth().createUserWithEmailAndPassword(email, password);
                } catch (createError) {
                  dispatch({ type: AUTH_ERROR, payload: createError.message });
                }
                break;
              default: dispatch({ type: AUTH_ERROR, payload: error.message });
            }
          }
          break;
        default: throw new Error(
          'Unknown auth provider'
        );
      }
    },
    []
  );

  const logOut = useCallback(
    () => { firebase.auth().signOut(); },
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
