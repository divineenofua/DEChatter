<template>
  <div class="contain">
    <div class="grp"> 
    <SearchBar @clear="originalArticles"   @search="findArticles" class="search-bar" />
    <SideNav    class="side-nav" /></div>

    <div  class="feed-container">
      <div class="feed">
        <div class="top-header">
          <div class="left-item">
            <h5>{{ header}} FEEDS </h5>
            <span>Explore different content You'd love</span>
          </div>
          <div class="btn">
            <button><v-icon name="bi-pencil" /> Post a content</button>
          </div>
        </div>
        <div class="top-bar">
          <div class="top-items">
            <div class="dif">
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
       
          <div class="blog-item" @click="readBlog(item)"   > 

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
                <div class="btn"><v-icon :class="{'iconActive':isActive}" @click='iconToggle' name= "fa-regular-heart" v-if="!isActive" />
                <v-icon :class="{'iconActive':isActive}" @click='iconToggle' name= "bi-heart-fill" v-else />
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
    <div class="loading" v-else-if="!loadingArticles && feedArr.length === 0">
              No article found
            </div>
        <div v-else class="loading">
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
import { onBeforeMount  } from 'vue';
import { ref } from 'vue'
import { storeSpace } from '@/stores/piniaStores';
import {defineProps }from 'vue';
import { useRouter } from 'vue-router'
// import { or } from 'firebase/firestore'

const router = useRouter();
const isActive = ref(false);
const iconToggle = () => {
  isActive.value = !isActive.value;
}

const props = defineProps({
  apiUrl: String ,
  header: String 
});

const storeArticles = storeSpace();
 
const feedArr = ref([]);
const originalArrStore = ref([]);
const loadingArticles = ref(false)
  const datad = ref();
  
  
  const apiUrlstore = props.apiUrl;
   
 onBeforeMount(() => { 
   loadingArticles.value = true;
      fetch(apiUrlstore)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data);
   datad.value= data;
      data.articles.map((items) => {
      feedArr.value.push(items)
      originalArrStore.value.push(items);
    })

    storeArticles.searchData(feedArr.value);
    storeArticles.searchArticles(originalArrStore.value);

  });

 
})
const originalArticles = () => {
  feedArr.value= originalArrStore.value;
  console.log('my mama rita')
}
  const findArticles = () => {
    loadingArticles.value = false;
    const searchTerm = storeArticles.dataSearch.toLowerCase();
    if(searchTerm === ''){
    //  return  datad.value.articles.map((items) => {
    //   feedArr.value.push(items)
    // })
    feedArr.value= originalArrStore.value;
  }  

   const filteredArticles = feedArr.value.filter(item => {
    console.log(item.title.toLowerCase().indexOf(searchTerm) !== -1);
    return item.title.toLowerCase().indexOf(searchTerm) !== -1 || item.description.toLowerCase().indexOf(searchTerm) !== -1
   });

  feedArr.value = filteredArticles;

   
   
 };

const readBlog = (article) => {
  storeArticles.grabItem(article)
  router.push({ name: 'BlogView'   });
  console.log(article)
}
  
 
</script>
