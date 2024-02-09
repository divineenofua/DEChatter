import {defineStore} from 'pinia'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../db'
import {reactive} from 'vue'

 
export  const useAuthStore = defineStore('authStore',() => {
    const state = reactive({
        error: '         ERROR' ,
    });
    const registerUser = async (credentials) => {
       console.log('cred by',credentials);
       
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
    return{
        registerUser,
        state,
    }
})