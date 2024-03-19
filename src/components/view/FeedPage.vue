<template>
  <div class="contain">
    <div class="grp">
      <SearchBar @clear="originalArticles" @keyup.enter="findArticles" class="search-bar" />
      <SideNav class="side-nav" />
    </div>

    <div class="feed-container">
      <div class="feed">
        <div class="top-header">
          <div class="left-item">
            <h5>{{ header }} FEEDS</h5>
            <span>Explore different content You'd love</span>
          </div>
          <div class="btn">
            <RouterLink class="postLink" :to="{ name: 'PostView' }">
              <button><v-icon name="bi-pencil" /> Post a content</button>
            </RouterLink>
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
          <div class="blog-content">
            <div class="items" v-for="(item, index) of firebasePosts" :key="index">
              <div class="blog-item" @click="viewBlog(item)">
                <div class="top-header2">
                  <img
                    class="prof-pic"
                    src="/src/assets/christina-wocintechchat-com-c5pRBXFhJgo-unsplash.jpg"
                    alt=""
                  />
                  <div class="top-items">
                    <h5>{{ userNameId }}</h5>
                    <span> {{ item.postTime }}</span>
                  </div>
                </div>
                <div class="btm">
                  <p class="title">{{ item.title }}</p>
                  <!-- ttr time to read -->
                  <div class="ttr">
                    <v-icon name="bi-book" />
                    <small>10mins read</small>
                  </div>
                  <p class="descrip">{{ item.text }}</p>
                  <img class="blog-image" :src="item.imageUrl" />
                </div>
              </div>
              <div class="interact-btn">
                <div class="btn">
                  <v-icon
                    :class="{ iconActive: item.liked }"
                    @click="iconToggle(item)"
                    name="fa-heart"
                    class="like"
                  />
                   <small>{{ item.likes }}</small>
                </div>
                <div class="btn" @click="showComment(item)">
                  <v-icon name="co-comment-bubble" />
                  <small>{{ item.commentcount }}</small>
                </div>
                <div class="btn">
                  <v-icon name="bi-file-bar-graph" />
                  <small>50</small>
                </div>
              </div>
              <div class="comment" :class="{ Active: item.comment }">
                <div
                  class="display-comment"
                  v-for="(comment, commentKey) in item.comments"
                  :key="commentKey"
                >
                  <template v-if="comment.timestamp === item.timestamp">
                    <v-icon name="fa-user-circle" />
                    <p>{{ comment.comment }}</p>
                    <small>{{ userNameId }}</small>
                    <small>{{ comment.date }}</small>
                  </template>
                </div>
                <div class="comment-item">
                  <input
                    type="text"
                    v-model="comment"
                    @keyup.enter="addFireBaseComment(item)"
                    placeholder="write a comment"
                  />
                  <button class="com-btn" @click="addFireBaseComment(item)">Post</button>
                </div>
              </div>
            </div>

            <div class="items" v-for="(item, index) of feedArr" :key="index">
              <div class="blog-item" @click="readBlog(item)">
                <div class="top-header2">
                  <img
                    class="prof-pic"
                    src="/src/assets/christina-wocintechchat-com-c5pRBXFhJgo-unsplash.jpg"
                    alt=""
                  />
                  <div class="top-items">
                    <h5>{{ item.source.name }}</h5>
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
                  <img class="blog-image" :src="item.image" />
                </div>
              </div>
              <div class="interact-btn">
                <div class="btn">
                  <v-icon
                    :class="{ iconActive: item.liked }"
                    @click="iconToggle(item)"
                    name="fa-heart"
                    class="like"
                  />
                  <small>{{ item.likes }}</small>
                </div>
                <div class="btn" @click="showComment(item)">
                  <v-icon name="co-comment-bubble" />
                  <small> {{ item.comments }}</small>
                </div>
                <div class="btn">
                  <v-icon name="bi-file-bar-graph" />
                  <small>50</small>
                </div>
              </div>
              <div class="comment" :class="{ Active: item.comment }">
                <div class="display-comment" v-for="(c, index) in item.commentArr" :key="index">
                  <div class="ite">
                    <v-icon name="fa-user-circle" /><span class="userName">{{ userNameId }}</span>
                  </div>
                  <p>{{ c.comment }}</p>
                  <span>{{ c.timestamp }}</span>
                </div>
                <div class="comment-item">
                  <input
                    type="text"
                    v-model="comment"
                    @keyup.enter="addComment(item)"
                    placeholder="write a comment"
                  />
                  <button class="com-btn" @click="addComment(item)">Post</button>
                </div>
              </div>
            </div>
          </div>
          <div class="loading" v-if="!loadingArticles && feedArr.length === 0">
            No article found
          </div>
          <div v-else class="loading">
            Loading articles... <v-icon name="fa-spinner" scale="1.5" animation="spin-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideNav from '../SideNav.vue'
import SearchBar from '../SearchBar.vue'
import { onBeforeMount} from 'vue'
import { ref } from 'vue'
import { storeSpace } from '@/stores/piniaStores'
import { defineProps } from 'vue'
import { useAuthStore } from '../../stores/AuthStore'
import { useRouter } from 'vue-router'
// import { or } from 'firebase/firestore'

import { getDatabase, ref as firebaseRef, child, get } from 'firebase/database'

const authStore = useAuthStore()

const firebasePosts = ref([])
const userNameId = ref('')
 const dbRef = firebaseRef(getDatabase())
get(child(dbRef, 'posts'))
  .then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val())
      //firebasePosts.value.push(snapshot.val())
      const postsData = snapshot.val()
      firebasePosts.value = Object.values(postsData).reverse()
      console.log('hi', firebasePosts.value)
    } else {
      console.log('No data available')
    }
  })
  .catch((error) => {
    console.error(error)
  })
 
const router = useRouter()
const comment = ref('')
//const commentArr = ref([]);
//const isActive = ref(false);
const iconToggle = (item) => {
  item.liked = !item.liked
  if (item.liked) {
    item.likes += 1
  } else {
    item.likes -= 1
  }
}

const props = defineProps({
  apiUrl: String,
  header: String
})

const storeArticles = storeSpace()

const feedArr = ref([])
const originalArrStore = ref([])
const loadingArticles = ref(false)
const datad = ref()

const apiUrlstore = props.apiUrl

onBeforeMount(() => {
  loadingArticles.value = true
  fetch(apiUrlstore)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      datad.value = data
      data.articles.map((items) => {
        items.liked = false
        items.likes = 0
        items.comment = false
        items.comments = 0
        items.commentArr = []
        feedArr.value.push(items)
        originalArrStore.value.push(items)
      })

      storeArticles.searchData(feedArr.value)
      storeArticles.searchArticles(originalArrStore.value)
    })
})
const originalArticles = () => {
  feedArr.value = originalArrStore.value
  console.log('my mama rita')
}
const findArticles = () => {
  loadingArticles.value = false

  const searchTerm = storeArticles.dataSearch.toLowerCase()
  if (searchTerm === '') {
    //  return  datad.value.articles.map((items) => {
    //   feedArr.value.push(items)
    // })
    feedArr.value = originalArrStore.value
  }

  const filteredArticles = feedArr.value.filter((item) => {
    console.log(item.title.toLowerCase().indexOf(searchTerm) !== -1)
    return (
      item.title.toLowerCase().indexOf(searchTerm) !== -1 ||
      item.description.toLowerCase().indexOf(searchTerm) !== -1
    )
  })

  feedArr.value = filteredArticles
}

const readBlog = (article) => {
  storeArticles.grabItem(article)
  router.push({ name: 'BlogView' })
  console.log(article)
}

const showComment = (item) => {
  item.comment = !item.comment
}

const addComment = (item) => {
  if (comment.value !== '') {
    item.comments += 1
    item.commentArr.push({ comment: comment.value, timestamp: new Date().toString().slice(0, -36) })
    comment.value = ''
  } else {
    console.log('empty field')
  }
}
console.log('yes', comment.value)

userNameId.value = authStore.userName.slice(0, -10)

const viewBlog = (item) => {
  storeArticles.grabViewItem(item)
  router.push({ name: 'BlogIView' })
  console.log(item)
}

// const db = getDatabase()

const addFireBaseComment = async (item) => {
  try {
    const commentData = {
      user: userNameId.value,
      comment: comment.value,
      timestamp: item.timestamp,
      date: new Date().toString().slice(0, -36)
    }

    if (Array.isArray(item.comments)) {
      item.comments.push(commentData)
    } else {
      item.comments = [commentData]
    }
    comment.value = ''
  } catch (error) {
    console.error('Error adding comment:', error)
  }
}
</script>
