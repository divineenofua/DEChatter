<template>
    <div class="contain">
      <div class="grp"> 
      <SearchBar     class="search-bar" />
      <SideNav    class="side-nav" /></div>
    </div>
    <div  class="feed-container">
      <div class="feed">
        <div class="top-header">
          <div class="left-item">
            <h5>MY POSTS</h5>
            <span>Explore Posts</span>
          </div>
          <div class="btn">
            <RouterLink class="postLink" :to="{name:'PostView'}"> 
            <button><v-icon name="bi-pencil" /> Post a content</button>
          </RouterLink>
          </div>
        </div>
         
        <div class="feed-content">
           
            </div>
        </div>
          </div>
 
</template>
<script setup>
import SideNav from '../SideNav.vue'
import SearchBar from '../SearchBar.vue'
</script>