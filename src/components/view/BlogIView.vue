<template>
    
    <div class="blog-container">
      <div class="prev" @click="RouteBack">
         <v-icon name="fa-arrow-left" />Go back
  </div>
  
      <div class="blog-item">
        <div class="blog-content"> 
        <div class="top-header2">
          <img
            class="prof-pic"
            src="/src/assets/christina-wocintechchat-com-c5pRBXFhJgo-unsplash.jpg"
            alt=""
          />
          <div class="top-items">
            <h5>{{   }}</h5>
            <span>{{ storeItem.blogViewItem.postTime }}</span>
          </div>
        </div>
        <div class="btm">
          <p class="title">{{ storeItem.blogViewItem.title }}</p>
          <!-- ttr time to read -->
          <span class="src">source : chatterApp blog </span>
          <div class="ttr">
            <v-icon name="bi-book" />
            <small>10mins read</small>
          </div>
          <div>
            <img class="blog-image" :src="storeItem.blogViewItem.imageUrl" />
          </div>
          <div class="blog-text">
            <p>{{ storeItem.blogViewItem.text }}</p>
          </div>
          <div class="blog-link">
            <a  >Click To View Full Blog Content</a>
          </div>
          <img class="blog-image" />
          <div class="interact-btn">
            <div class="btn">
              <v-icon name="fa-regular-heart" />
              <small>200</small>
            </div>
            <div class="btn">
              <v-icon name="co-comment-bubble" />
              <small>190</small>
            </div>
            <div class="btn">
              <v-icon name="bi-file-bar-graph" />
              <small>750</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
     
  </template>
  
  <script setup>
  import { storeSpace } from '@/stores/piniaStores'
   
  import { useRouter } from 'vue-router'
  const router = useRouter();
  const storeItem = storeSpace()
  
  const RouteBack = () => {
   router.go(-1);
   console.log('sssg')
  }
  </script>
  
   
  
  