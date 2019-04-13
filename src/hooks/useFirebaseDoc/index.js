import { useCallback, useEffect, useReducer, useRef } from 'react';
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

  const isCanceled = useRef(false);

  useEffect(() => {
    return () => { isCanceled.current = true; };
  }, []);

  const fetchDoc = useCallback(
    () => {
      dispatch({ type: FETCH + DOC + START });
      return db.doc(path).get()
        .then(doc => {
          !isCanceled.current && (dispatch({
            type: FETCH + DOC + SUCCESS,
            payload: { ...doc.data(), id: doc.id }
          }));
        })
        .catch(() => {
          !isCanceled.current && dispatch({ type: FETCH + DOC + FAIL });
        });
    },
    [path]
  );

  return [fetchStatus, fetchDoc, payload];
};
