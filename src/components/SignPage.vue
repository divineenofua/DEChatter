<template>
  <div class="login-container">
    <CoverPage class="cover" />
    <div class="view login">
      <NavPage />
      <form id="form" class="login-form" @submit.prevent="validateInput">
        <h1>Register as a Writer/Reader</h1>
        <div class="name-tag">
          <div>
            <label for="First-name">First Name</label>
            <input type="text" v-model="user.firstName" placeholder="first name" />
          </div>
          <div>
            <label for="last-name"> Email Address</label>
            <input type="text" v-model="user.lastName" placeholder="last name" />
          </div>
        </div>

        <div>
          <label for="select"> You are Joining as?</label>
          <select name="select" v-model="user.select" id="select-option">
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

        <button type="button">
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
import CoverPage from './CoverPage.vue'
import NavPage from './NavPage.vue'
import { useToast } from 'vue-toastification'
import { reactive } from 'vue'
import { useAuthStore } from '../stores/AuthStore'

const authStore = useAuthStore();
//const error = authStore.state;
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


    authStore.registerUser(user)
      .then(() => {
        console.log('Registration successful');
        authStore.state.error = ''; // Clear error message on successful registration
        // Optionally, you can redirect the user or perform other actions here
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        toast.error(authStore.state.error ); // Display error message
      });
    // authStore.registerUser(user)
    //   console.log('please',error);
       
    //     toast.error(error.error.slice(9));
    //     console.log('na somwe see am');
      
     
  }
}
</script>
