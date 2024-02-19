import {defineStore} from 'pinia'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../db'
import {reactive} from 'vue'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

 

 


export  const useAuthStore = defineStore('authStore',() => {
    const state = reactive({
        error: '         ERROR' ,
    });
    const registerUser = async (credentials) => {
       
      await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log('user by', user)
  }) 
  .catch((error) => {
   // const errorCode = error.code;
    state.error = error.message;
    console.log('error', state.error)
    throw error
     
  });
 
    }

    const logInWithGoggle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
     
    const errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    console.log(email);
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(credential);
    // ...
  });
    }
    
    


    return{
        registerUser,
        state,
        logInWithGoggle
     }
})
 
