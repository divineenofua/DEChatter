<template>

    <div class="search-container">
        <div class="search-contents"> 
            <div></div>
         <div class="search-input">
            <v-icon name="fa-search" />
            <input v-model="search"  @keydown.enter="searchItem" type="search" placeholder="Search Chatter">
        </div>
        <div class="notify">
            <v-icon name="bi-bell" animation="ring"/>
          <v-icon name="fa-user-circle" scale="2.5"/> 
 
         </div>
    </div>
</div>
</template>
<script setup>
import {ref} from 'vue';
import { storeSpace } from '@/stores/piniaStores';
 const search = ref('');

const storeData = storeSpace();


const searchItem = () => {
    storeData.searchData(search.value);
}
 


</script>
