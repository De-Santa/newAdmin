import { useEffect, useState } from 'react';
import { db } from 'src/firebase.db';

export const useFirebaseCollection = (path, orderBy) => {
  const [payload, setPayload] = useState([]);

  useEffect(
    () => {
      let collection = db.collection(path);
      if (orderBy) collection = collection.orderBy(orderBy);
      return collection.onSnapshot((snapshot) => {
        const docs = [];
        snapshot.forEach(doc => docs.push({ ...doc.data(), id: doc.id }));
        setPayload(docs);
      });
    },
    [orderBy, path]
  );

  return payload;
};
