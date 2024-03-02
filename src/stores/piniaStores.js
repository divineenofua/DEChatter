 import { defineStore } from "pinia";
 import { ref } from 'vue'

  
 export const storeSpace = defineStore( 'storedata', () => {
 const dataSearch = ref();
 const articlesSave = ref([]);
  const blogItem = ref();
    const searchData = (data) => {
     
        dataSearch.value= data;
   }

   const searchArticles =(articles) => {
       
       articlesSave.value =articles;
   }
   const grabItem = (title) => { 
     blogItem.value = title;
   }
   

   return{
    searchData,
    dataSearch,
    searchArticles,
    blogItem,
    grabItem
   }
 })