<template>
    <div class="contain">
      <SearchBar    class="search-bar" />
      <SideNav  class="side-nav" />

      <div class="feed-container analy">
        <h2>Posts Analytics</h2>
        <div class="date">
           <span>  {{ blogDate   }},  <small>25 Days Ago</small></span>
        </div>
        <h3 class="analy-title">Post Highlights</h3>
        <div class="analy-info">
          <h2>Top posts    </h2><small> earned 20678 impressions</small>
        </div>
        <div class="blog-item"   > 
        <div class="top-header2">
              <img class="prof-pic"  :src="blogItem.urlToImage" alt="" />
              <div class="top-items">
                <h5>{{ blogItem.author }}</h5>
                <span>{{ blogDate }}</span>
              </div>
            </div>
            <div class="btm"> 
            <p class="title">{{ blogItem.title }}</p>
            <!-- ttr time to read -->
            <div class="ttr">
            <v-icon name="bi-book" />
            <small>10mins read</small>
            </div>
            <p class="descrip">{{ blogItem.description }}</p>
          
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
              <div class="btn">
                <button>View Post Activity</button>
              </div>
              <div class="post-sum">
                <span>{{ blogDate   }} summary</span>
              </div>
              <div class="analy-flex">
                <div class="items">
                  <div class="item">
                    <span>Posts</span>
                    <span>3</span>
                  </div>
                  <div class="item">
                    <span>Profile Visits</span>
                    <span>300</span>
                  </div>
                </div>

                <div class="items">
                  <div class="item">
                    <span>Post Impressions</span>
                    <span>2.98k Views</span>
                  </div>
                  <div class="item">
                    <span>Followers</span>
                    <span>550</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    </template>  

<script setup>
//import { defineProps } from 'vue';

import { ref } from 'vue'
import SideNav from '../SideNav.vue'
import SearchBar from '../SearchBar.vue'
import { storeSpace } from '@/stores/piniaStores';
 
const blogItem = ref();
const storeItem= storeSpace();
 
blogItem.value = storeItem.blogItem;

  const blogDate = Date(blogItem.value.publishedAt.slice(0 ,-10)).slice(0 ,-45)
 
 
 console.log('gedet', blogItem.value)
 
</script>