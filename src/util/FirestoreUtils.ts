import {db} from '../../config/FirebaseConfig';
import {doc, setDoc, getDoc} from 'firebase/firestore';

const setUserData = async (uuid: string, data: Object) => {
  await setDoc(doc(db, 'users', uuid), data);
};

const getUserData = async (uuid: string) => {
  const docRef = await getDoc(doc(db, 'users', uuid));
  return docRef;
};

export {setUserData, getUserData};
