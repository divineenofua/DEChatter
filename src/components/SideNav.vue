<template class="main">
  <div class="sidebar-content">
    <div @click="showSideBar" class="ope-sidebar">
      <v-icon v-if="isActive === true" name="fa-times" scale="1.7" />
      <v-icon v-else name="fa-table" scale="1.7" />
    </div>

    <div class="sidebar-container" v-bind:class="{ active: isActive }">
      <div class="logo">CHATTER</div>
      <div class="items-contents">
        <div class="items">
          <h5>Overview</h5>
          <div class="sub-items icon">
            <div class="item">
              <RouterLink class="navigate"  :to="{ name: 'FeedPage' }" active-class="router">
                <v-icon name="bi-crop" />
                <span>Feed</span>
              </RouterLink>
            </div>
            <div class="item">
              <v-icon name="bi-bookmark" />
              <span>Bookmark</span>
            </div>
            <div class="item">
              <v-icon name="bi-people" />
              <span>team Blogs</span>
            </div>
            <div class="item">
              <v-icon name="bi-envelope" />
              <span>Drafts</span>
            </div>
            <div class="item">
              <RouterLink class="navigate"   :to="{ name: 'postAnalytics' }" active-class="router">
                <v-icon name="bi-graph-up-arrow" />
                <span>Analytics</span>
              </RouterLink>
             </div>
          </div>
        </div>

        <div class="items">
          <h5>Trending Tags <v-icon name="fa-chart-bar" /></h5>
          <div class="sub-items">
            <div class="item">
              <span>Programming</span>
            </div>
            <div class="item">
              <span>Data science</span>
            </div>
            <div class="item">
              <span>Technology</span>
            </div>
            <div class="item">
              <span>Machine learning </span>
            </div>
            <div class="item">
              <span>Politics</span>
            </div>
            <div class="item">
              <span class="item-text">See All</span>
            </div>
          </div>
        </div>

        <div class="items">
          <h5>Personal</h5>
          <div class="sub-items icon">
            <div class="item">
              <v-icon name="bi-person" />
              <span>Account</span>
            </div>
            <div class="item">
              <v-icon name="bi-bell" />
              <span>Notifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isActive = ref(false)
const showSideBar = () => {
  isActive.value = !isActive.value
}
</script>
