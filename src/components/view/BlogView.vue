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
          <h5>{{ storeItem.blogItem.author }}</h5>
          <span>{{ storeItem.blogItem.publishedAt }}</span>
        </div>
      </div>
      <div class="btm">
        <p class="title">{{ storeItem.blogItem.title }}</p>
        <!-- ttr time to read -->
        <span class="src">source : {{ storeItem.blogItem.source.name }} </span>
        <div class="ttr">
          <v-icon name="bi-book" />
          <small>10mins read</small>
        </div>
        <div>
          <img class="blog-image" :src="storeItem.blogItem.urlToImage" />
        </div>
        <div class="blog-text">
          <p>{{ storeItem.blogItem.description }}</p>

          <p>{{ storeItem.blogItem.content.slice(0, -16) }} ........</p>
        </div>
        <div class="blog-link">
          <a :href="storeItem.blogItem.url">Click To View Full Blog Content</a>
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

 

