<template>
  <div class="container">
    <CoverPage class="cover" />
    <div class="view login ">
      <NavPage />
      <form id="form" class="login-form" @submit.prevent="onSubmit">
        <h1>Welcome Back</h1>
        <div>
          <label for="username"> Email Address</label>
          <input type="email" v-model="validUser.email" placeholder="Email..." />
        </div>
        <div>
          <label for="password"> Password</label>
          <input type="password" v-model="validUser.password" placeholder="Password..." />
        </div>
        <input type="submit" value="Log In" />
      </form>
    </div>
  </div>
</template>

<script setup>
import CoverPage from '../CoverPage.vue'
import NavPage from '../NavPage.vue';
import { useToast } from 'vue-toastification'
import { reactive } from 'vue'
 import { useAuthStore } from '/Users/Divine/fireChat/src/stores/AuthStore'
 import { useRouter } from 'vue-router'

const router = useRouter();
 const authStore = useAuthStore();

 const validUser = reactive({
 email: '',
 password: '',
 })
 
const toast = useToast();

const onSubmit = () => {

  if (!validUser.email  || !validUser.password) { 
    toast.error('please enter Email and Password')
  
   }else{
    authStore.logIn(validUser).then(() => {
    toast.success('login successful.');
    setTimeout(() => {
          router.push({ name: 'HomePage'  });
        },3000)
   })
   .catch(( ) => {
        console.log(authStore.state.error2);
        toast.error('Invalid Email or password'); // Display error message
      });
   }
  }

</script>
