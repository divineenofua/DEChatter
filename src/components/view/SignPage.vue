<template>
  <div class="container">
    <CoverPage class="cover" />
    <div class="view login  ">
      <NavPage />
      <form id="form" class="login-form sign" @submit.prevent="validateInput">
        <h1>Register as a Writer/Reader</h1>
        <div class="name-tag">
          <div >
            <label for="First-name">First Name</label>
            <input type="text" v-model="user.firstName" placeholder="first name" />
          </div>
          <div>
            <label for="last-name"> Last Name</label>
            <input type="text" v-model="user.lastName" placeholder="last name" />
          </div>
        </div>

        <div>
          <label for="select"> You are Joining as?</label>
          <select name="select" title="select"  v-model="user.select" id="select-option">
            <option value="Writer">Writer</option>
            <option value="Reader">Reader</option>
          </select>
        </div>
        <div>
          <label for="username"> Email Address</label>
          <input type="email" v-model="user.email" placeholder="Email..." />
        </div>

        <div>
          <label for="password"> Password</label>
          <input type="password" v-model="user.password" placeholder="Password..." />
        </div>
        <div>
          <label for="password">Confirm Password</label>
          <input
            type="password"
            v-model="user.confirmPassword"
            placeholder=" Confirm Password..."
          />
        </div>
        <input type="submit" value="Create Account" />

        <button type="button" @click.prevent="signInWithGoggle">
          <v-icon name="fc-google" scale="1.7" animation="pulse" hover />
          <a href="#">Sign Up With Goggle</a>
        </button>
        <button type="button">
          <v-icon name="bi-linkedin" class="linkedin" scale="1.7" animation="ring" hover /><a
            href="#"
            >Sign Up With Linkedin</a
          >
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import CoverPage from '../CoverPage.vue'
import NavPage from '../NavPage.vue'
import { useToast } from 'vue-toastification'
import { reactive } from 'vue'
import { useAuthStore } from '../../stores/AuthStore'
import { useRouter } from 'vue-router'
import {onUnmounted} from 'vue'
import {sendOtp}  from '../../stores/Otp'

 const router = useRouter();
  

const authStore = useAuthStore();
const otpVal = Math.floor(1000 + Math.random() * 9000);
const user = reactive({
  email: '',
  firstName: '',
  lastName: '',
  select: '',
  password: '',
  confirmPassword: ''
})

const toast = useToast()
const validateInput = () => {
  if (
    !user.email ||
    !user.password ||
    !user.lastName ||
    !user.confirmPassword ||
    !user.firstName ||
    !user.select
  ) {
    toast.error('Fill All Input Fields')
    return
  } else if (user.password !== user.confirmPassword) {
    toast.error('Passwords do not match')
    return
  } else {


    authStore.registerUser(user).then(() => {
       
        toast.success('Congratulations! You have been registered.');
        authStore.state.error = ''; 
        sendOtp(user, otpVal)
        setTimeout(() => {
          router.push({ name: 'ConfirmPage', params: {otpVal}  });
        },3000)
        
      })
      .catch(( ) => {
         toast.error(authStore.state.error.slice(9) ); // Display error message
      });



    
      
     
  }
}
//Firebase: Error (auth/popup-blocked).
const signInWithGoggle =() => {
  authStore.logInWithGoggle().then(() => {
  toast.success('Sign in with goggle successful')
  setTimeout(() => {
      router.push({ name: 'MainFeed'});
 },300)
 }) .catch((error) => {
        console.error('Registration failed:', error);
        toast.error(authStore.state.error3 ); // Display error message
      });
  
}

onUnmounted(() => {
   toast.clear();
});
</script>
// authStore.registerUser(user)
//   console.log('please',error);
   
//     toast.error(error.error.slice(9));
//     console.log('na somwe see am');

 