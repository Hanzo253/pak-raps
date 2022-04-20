import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import { collection, onSnapshot } from "firebase/firestore";

const useCollection = (collectionDatabase) => {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, collectionDatabase);

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });
    return () => unsub();
  }, [collectionDatabase]);

  return { documents };
};

export default useCollection;
