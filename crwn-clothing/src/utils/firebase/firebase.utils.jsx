import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,

} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4TrJC-ePIBAQKyXV-722N4cymqEH8aaQ",
    authDomain: "crwn-clothing-32775.firebaseapp.com",
    projectId: "crwn-clothing-32775",
    storageBucket: "crwn-clothing-32775.appspot.com",
    messagingSenderId: "973767712738",
    appId: "1:973767712738:web:ce02a01d1e1af081c723bb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// creating a db
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;


    // generate instance of a user
    const userDocRef = doc(db, "users", userAuth.uid) //  db- collection - identifier
    //get access to the user's data
    const userSnapshot = await getDoc(userDocRef);

    // if a user doesn't exist - create one
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInformation
            })
        } catch (err) {
            console.log(err.message)
        }
    }
    return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async() => await signOut(auth);
