 
<template>
     <div class="login-container">
       <CoverPage class="cover" />
       <div class="view login">
         <div class="navBar">
           <nav>
             <div class="nav-item"><a class="prev"  href="#">Register</a>
           <div class="log"></div></div>
             <div class="nav-item"><a class="next" href="#">Log In</a><div  ></div></div>
           </nav>
         </div>
         <form id="form" class="login-form" @submit.prevent="validateInput">
           <h1>Register as a Writer/Reader</h1>
           <div class="name-tag">
               <div><label for="First-name">First Name</label>
             <input type="text" v-model="firstName"  placeholder="first name"  />
          </div>
          <div><label for="last-name"> Email Address</label>
             <input type="text" v-model="lastName"  placeholder="last name"   />
          </div>
          </div>

          <div>
             <label for="select"> You are Joining as?</label>
          <select name="select" v-model="select" id="select-option">
               <option value="Writer">Writer</option>
               <option value="Reader">Reader</option>

          </select>
          </div>
          <div>
          <label for="username"> Email Address</label>
          <input type="email"  v-model="email" placeholder="Email..." />
        </div>


           <div>
             <label for="password"> Password</label>
             <input type="password" v-model="password"  placeholder="Password..." />
           </div>
           <div>
             <label for="password">Confirm Password</label>
             <input type="password"  v-model="confirmPassword" placeholder=" Confirm Password..." />
           </div>
           <input type="submit" value="Create Account" />
            
           <button type="button"><v-icon name="fc-google" scale="1.7" animation="pulse" hover/> <a href="#">Sign Up With Goggle</a></button>
           <button type="button"><v-icon name="bi-linkedin" class="linkedin" scale="1.7" animation="ring" hover/><a href="#">Sign Up With Linkedin</a></button>

          </form>
       </div>
     </div>
   </template>

<script setup>
 
import CoverPage from './CoverPage.vue'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const select = ref('')
const password = ref('')
const confirmPassword = ref('')


const toast = useToast()
const validateInput = () => {
  if (!email.value || !password.value || !lastName.value || !confirmPassword.value || !firstName.value || !select.value ) {
    toast.error('Fill All Input Fields')
    return
  }
}
 
 
</script>