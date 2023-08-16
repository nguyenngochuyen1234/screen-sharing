import { set, ref, onValue, remove, update, child, get } from "firebase/database";
import database from './init'

export const setDocument = async (collectionName: string, documentId: string, data: Record<string, any>) => {
    await set(ref(database, collectionName + '/' + documentId), data)
}


export const updateDocument = async (collectionName: string, documentId: string, data: Record<string, any>) => {
    await update(ref(database, `/${collectionName}` + `/${documentId}`), data);
}

export const getDocument = async (collectionName: string, documentId: string) => {
    let result = null
    const starCountRef = ref(database, collectionName + '/' + documentId);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        result = data
    });
    return result
}

export const getDocuments = async (collectionName: string) => {
    const result: any[] = []
    onValue(ref(database, collectionName), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            Object.entries(data).map(([key, value]) => {
                if (typeof value === 'object') {
                    result.push({ ...value, id: key });
                }
            });
        }
    });
    return result
}

export const deleteDocument = async (collectionName: string, documentId: string) => {
    console.log(collectionName + '/' + documentId)
    remove(ref(database, collectionName + '/' + documentId));
}
