import { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from '../firebase/config'

const useFireStore = (collec, condition) => {
    const [documents, setDocuments] = useState([])
    useEffect(() => {
        let collectionRef = query(collection(db, collec))
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                setDocuments([]);
                return;
            }
            collectionRef = query(collection(db, collec), where(condition.fieldName, condition.operator, condition.compareValue))
        }
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setDocuments(documents)
        })
        return unsubscribe
    }, [collec, condition])
    return documents
}

export default useFireStore;