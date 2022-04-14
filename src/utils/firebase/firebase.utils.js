import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect
} from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
    getFirestore
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDWvTaywdlEXQymbvwhVd1Yho9DMZ_XLE8",
  authDomain: "crwn-clothing-db-3ded2.firebaseapp.com",
  projectId: "crwn-clothing-db-3ded2",
  storageBucket: "crwn-clothing-db-3ded2.appspot.com",
  messagingSenderId: "968941350924",
  appId: "1:968941350924:web:e67cea66593ddf3fbabe29"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        displayName,
      })
    } catch (error) {
      console.log("error creating the user", error.message)
    }
  }
  return userDocRef;
}
