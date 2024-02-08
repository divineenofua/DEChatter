<template>
  <div class="login-container">
    <CoverPage class="cover" />
    <div class="view login">
      <div class="navBar">
        <nav>
          <div class="nav-item"><a class="prev"  href="#">Register</a>
        <div></div></div>
          <div class="nav-item"><a class="next" href="#">Log In</a><div class="log"></div></div>
        </nav>
      </div>
      <form id="form" class="login-form" @submit.prevent="onSubmit">
        <h1>Welcome Back</h1>
        <div>
          <label for="username"> Email Address</label>
          <input type="email" v-model="email" placeholder="Email..." />
        </div>
        <div>
          <label for="password"> Password</label>
          <input type="password" v-model="password" placeholder="Password..." />
        </div>
        <input type="submit" value="Log In" />
      </form>
    </div>
  </div>
</template>

<script setup>
import CoverPage from './CoverPage.vue'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const toast = useToast()
const onSubmit = () => {
  if (!email.value || !password.value) {
    toast.error('please enter Email and Password')
    return
  }
}
</script>
