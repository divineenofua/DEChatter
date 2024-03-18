import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../db'
import { reactive ,ref} from 'vue'
import { GoogleAuthProvider, signInWithPopup,  signOut } from 'firebase/auth'

export const useAuthStore = defineStore('authStore', () => {
  const state = reactive({
    error: '         ERROR',
    error2: '         ERROR',
    error3: '         ERROR'
  })
  const provider = new GoogleAuthProvider()
   const userName = ref('');

  const logInWithGoggle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        console.log(token)
        const user = result.user
        console.log(user)
        console.log('completed goggle')
        
      })
      .catch((error) => {
        state.error3 = error.message
        console.log(state.error3)

        const email = error.customData.email
        console.log(email)
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(credential)
        // ...
      })
  }
  const logIn = async (user) => {
    await signInWithEmailAndPassword(auth, user.email, user.password, user.displayName)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user, 'signin')
      })
      .catch((error) => {
        state.error2 = error.message
         console.log(error.message)
        throw error
      })
  }

  const registerUser = async (credentials) => {
    await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user
        console.log('user by', user)
        userName.value= user.email;
      })
      .catch((error) => {
        // const errorCode = error.code;
        state.error = error.message
        console.log('error', state.error)
        throw error
      })
  }

  const signOutUser = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
    });
  }

  return {
    registerUser,
    state,
    logInWithGoggle,
    logIn,
    signOutUser,
    userName
  }
})
