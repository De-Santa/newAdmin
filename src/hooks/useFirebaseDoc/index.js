import { useEffect, useReducer } from 'react';
import { db } from 'src/firebase.db';
import {
  FETCH, START, SUCCESS, FAIL, PRISTINE, PENDING, COMPLETE, ERROR
} from 'constants/fetchStatus';

const DOC = 'DOC';

const initialState = {
  fetchStatus: PRISTINE,
  payload: {}
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH + DOC + START:
      return { ...state, fetchStatus: PENDING };
    case FETCH + DOC + SUCCESS:
      return { fetchStatus: COMPLETE, payload };
    case FETCH + DOC + FAIL:
      return { ...state, fetchStatus: ERROR };
    default:
      throw new Error();
  }
};

export const useFirebaseDoc = (path) => {
  const [{ fetchStatus, payload }, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () => {
      let canceled = false;
      dispatch({ type: FETCH + DOC + START });
      db.doc(path).get()
        .then(doc => {
          !canceled && dispatch({
            type: FETCH + DOC + SUCCESS,
            payload: { ...doc.data(), id: doc.id }
          });
        })
        .catch(() => {
          dispatch({ type: FETCH + DOC + FAIL });
        });
      return () => {
        canceled = true;
      };
    },
    [path]
  );

  return [fetchStatus, payload];
};
