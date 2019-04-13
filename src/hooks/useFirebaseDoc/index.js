import { useEffect, useState } from 'react';
import { db } from 'src/firebase.db';

export const useFirebaseDoc = (path) => {
  const [payload, setPayload] = useState({});

  useEffect(
    () => {
      let canceled = false;
      db.doc(path).get()
        .then(doc => {
          !canceled && setPayload({ ...doc.data(), id: doc.id });
        });
      return () => {
        canceled = true;
      };
    },
    [path]
  );

  return payload;
};
