<template>
  <div class="contain">
    <SearchBar  @search="findArticles" class="search-bar" />
    <SideNav  class="side-nav" />

    <div  class="feed-container">
      <div class="feed">
        <div class="top-header">
          <div class="left-item">
            <h5>FEED</h5>
            <span>Explore different content You'd love</span>
          </div>
          <div class="btn">
            <button><v-icon name="bi-pencil" /> Post a content</button>
          </div>
        </div>
        <div class="top-bar">
          <div class="top-items">
            <div>
              For You
              <div class="bg"></div>
            </div>
            <div>
              Featured
              <div></div>
            </div>
            <div>
              Recent
              <div></div>
            </div>
          </div>
        </div>
        <div class="feed-content">
            <div class="blog-content" v-if="feedArr.length > 0" > 
          <div  class="items"     v-for="(item, index) of feedArr" :key="index">
       
          <div class="blog-item"  @click="getItem(item)"> 
            <div class="top-header2">
              <img class="prof-pic" src="/src/assets/christina-wocintechchat-com-c5pRBXFhJgo-unsplash.jpg" alt="" />
              <div class="top-items">
                <h5>{{ item.author }}</h5>
                <span>{{ item.publishedAt }}</span>
              </div>
            </div>
            <div class="btm"> 
            <p class="title">{{ item.title }}</p>
            <!-- ttr time to read -->
            <div class="ttr">
            <v-icon name="bi-book" />
            <small>10mins read</small>
            </div>
            <p class="descrip">{{ item.description }}</p>
            <img class="blog-image" :src="item.urlToImage" />
              <div class="interact-btn">
                <div class="btn"><v-icon name="fa-regular-heart" />
                <small>200</small>
                </div>
                <div class="btn"><v-icon name="co-comment-bubble" />
                <small>190</small>
                </div>
                <div class="btn"><v-icon name="bi-file-bar-graph" />
                <small>750</small>
                </div>

              </div>
            </div>
          </div>
        </div>
    </div>
        <div v-else>
        Loading articles...
      </div>

    </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideNav from '../SideNav.vue'
import SearchBar from '../SearchBar.vue'
import { onBeforeMount } from 'vue';
import { ref } from 'vue'
import { storeSpace } from '@/stores/piniaStores';
import { useRouter } from 'vue-router'

const router = useRouter();

const storeArticles = storeSpace();
 
let feedArr = ref([]);

 let datad = ref();
 
  const getItem = (item) => {
  storeArticles.grabItem(item);
  setTimeout(() => {
      router.push({ name: 'postAnalytics'});
 },1000)    
 }
 

 onBeforeMount(() => { 
      fetch(' https://newsapi.org/v2/everything?q=keyword&apiKey=1a90e565119c4997b65a38772e7c37a4')
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data);
   datad.value= data;
      data.articles.map((items) => {
      feedArr.value.push(items)
    })
    storeArticles.searchData(feedArr.value);
  });

 
})
  const findArticles = () => {
    const searchTerm = storeArticles.dataSearch.toLowerCase();
    if(searchTerm === ''){
     return  datad.value.articles.map((items) => {
      feedArr.value.push(items)
    })
  }  

   const filteredArticles = feedArr.value.filter(item => {
    console.log(item.title.toLowerCase().indexOf(searchTerm) !== -1);

   
    return item.title.toLowerCase().indexOf(searchTerm) !== -1 || item.description.toLowerCase().indexOf(searchTerm) !== -1
   });

  feedArr.value = filteredArticles;

   
   
 };


  
 
</script>
