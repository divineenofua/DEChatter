<template>
  <div class="container">
    <CoverPage class="cover" />
    <div class="confirm-container">
        <h1> Enter Confirmation Code </h1>
        <span>We emailed you a code. Please input the code below for account verification </span>
      <div class="content" >
        <!-- <div class="input-item"  v-for="(key, index) in keys" :key="index"><input v-model="keys[index]" class="no-spinners" type="text" maxlength="1" pattern="[0-9]" @keyup="moveToNextInput(index)" /></div>
         </div> -->
         <div class="input-item" v-for="(key, index) in keys" :key="index" ><input v-model="keys[index]" class="no-spinners" type="text" maxlength="1" pattern="[0-9]" @keyup="moveToNextInput(index)"></div>
      </div>
         <input type="submit" value="Create Account" @click.prevent="confirm" />
    </div>
    
  </div>
</template>

<script setup>
import CoverPage from '../CoverPage.vue'
import { useToast } from 'vue-toastification'
import { ref } from 'vue';
import { defineProps } from 'vue';
// import router from '@/router';
import { useRouter } from 'vue-router'
const router = useRouter();


const props = defineProps({
  otpVal:{
    type: String,
    required:true
  }, 
  user:{
    type: Object,
    required:true
  }
});
const toast = useToast();
const keys = ref(['', '', '', '']);


const moveToNextInput = (index) => {
  // Move to the next input field when a character is entered
  if (index < keys.value.length - 1 && keys.value[index].length === 1) {
    const nextInput = document.querySelector(`.input-item:nth-child(${index + 2}) input`);
    nextInput.focus();
  }
}

const confirm = () => {
  const enteredCode = keys.value.join('');
  if (enteredCode === props.otpVal){
    toast.success('Code confirmed');
    setTimeout(() => {
      router.push({ name: 'MainFeed'});
 },300)
  } else {
    toast.error('Incorrect code. Please try again.');
  }
}





 
</script>


 