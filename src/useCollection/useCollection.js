import React from "react";
import { useState, useEffect, useRef } from "react";
import { database } from "../firebase/config";

import { collection, onSnapshot, query, where } from "firebase/firestore";

const useCollection = (collectionDatabase, commentsQuery) => {
  const [documents, setDocuments] = useState(null);

  // set up query
  const queries = useRef(commentsQuery).current;

  useEffect(() => {
    let ref = collection(database, collectionDatabase);

    if (queries) {
      ref = query(ref, where(...queries));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });
    return () => unsub();
  }, [collectionDatabase, queries]);

  return { documents };
};

export default useCollection;
