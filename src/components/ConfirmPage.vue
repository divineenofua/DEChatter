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
import CoverPage from './CoverPage.vue'
import { useToast } from 'vue-toastification'
import { ref } from 'vue';
import { defineProps } from 'vue';
const props = defineProps({
  otpVal:{
    type: String,
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
  console.log(keys.value)
  const enteredCode = keys.value.join('');
  if (enteredCode === props.otpVal){
    toast.success('Code confirmed');
  } else {
    toast.error('Incorrect code. Please try again.');
  }
}





// const key1 = ref();
// const key2 = ref();
// const key3 = ref();
// const key4 = ref();
// const joinArr = ref();
 
// //push keys 
//   const pushKeys = () =>{
//     arrKey.value.push(key1.value,key2.value,key3.value,key4.value);
//     console.log(arrKey.value);
//     joinArr.value = parseInt(arrKey.value.join(''));
//      if (joinArr.value === props.otpVal){
//       toast.success('Code confirmed');
//      }
      
//   }

// const confirm = () => {
//   console.log(props.otpVal)
 
//   if(key1.value || key2.value || key3.value || key4.value){
//      pushKeys();
//    }else{
//     toast.error('Input confirm code');

//   }
// }
</script>


 