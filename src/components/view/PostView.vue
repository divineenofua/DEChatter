<template>
  <div class="contain">
    <SearchBar class="search-bar" />
    <SideNav class="side-nav" />
    <div class="post-container">
      <div class="post-content">
        <div class="post-box">
          <div class="btn">
            <button @click="publish" type="submit">Publish</button>
          </div>
          <div class="content">
            <div class="image-container">
              <label for="addimage" class="custom-file-button">
                <v-icon class="img-icon" name="bi-image" scale="1.9" />
              </label>
              <input class="addImage" id="addImage" type="file" @change="handleFileInputChange" />
             
            </div>
            <div class="video-container">
              <v-icon class="vid-icon" name="bi-camera-video" scale="1.9" />
              <input class="addVid" id="addVid" type="file" @change="handlevidInputChange" />
            
            </div>
          </div>
        </div>
        <div class="main-content">
          <img
                v-if="imageUrl"
                style="min-width: 100%; max-height: 300px; margin-top: 30px"
                :src="imageUrl"
                alt="Uploaded Image"
              />
              <video
                v-if="videoUrl"
                :src="videoUrl"
                controls
                style="max-width: 100%; max-height: 300px; margin-top: 30px"
              ></video>
          <div class="post-text">
            <textarea
              v-model="postData.title"
              class="post-texttitle"
              placeholder="Title"
            ></textarea>
            <textarea
              v-model="postData.text"
              :rows="textareaRows"
              class="post-textarea"
              placeholder="Write a post....."
            ></textarea>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import SideNav from '../SideNav.vue'
import { useToast } from 'vue-toastification'
import SearchBar from '../SearchBar.vue'
import { ref, computed } from 'vue'
import { getDatabase, ref as firebaseRef, set, serverTimestamp, push } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from '../../stores/AuthStore'
// import { useRouter } from 'vue-router'
// const router = useRouter();
const toast = useToast()
const userNameId = ref('')
const authStore = useAuthStore()

userNameId.value = authStore.userName.slice(0, -10)
 
const postDate = new Date().toISOString().slice(0, 10);


const db = getDatabase()
const storage = getStorage()
const mediaRef = storageRef(storage, 'blogMedia')

const imageUrl = ref(null)
const videoUrl = ref(null)
const postData = ref({ title: '', text: '' })

const handleFileInputChange = async (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    imageUrl.value = URL.createObjectURL(file)
  }
}

const handlevidInputChange = async (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('video/')) {
    videoUrl.value = URL.createObjectURL(file)
  }
}

const textareaRows = computed(() => Math.ceil(postData.value.text.length / 50))

const publish = async () => {
  if(postData.value.title=== '' || postData.value.text === '' ){
    toast.error('No item to Post')
  }
  else{
    toast.success('Post Created')
  //  resetFormData();

  try {
    let imageData = null
    let videoData = null


    if (imageUrl.value) {
      const imageFile = await uploadMedia(imageUrl.value)
      imageData = await getImageDownloadURL(imageFile)
    }

    if (videoUrl.value) {
      const videoFile = await uploadMedia(videoUrl.value)
      videoData = await getVideoDownloadURL(videoFile)
    }

    await saveBlogPost(imageData, videoData)

    resetFormData()
    
  } catch (error) {
    console.error('Error publishing post:', error)
  }

  console.log('you', imageUrl.value);
  console.log(videoUrl.value);
//  setTimeout(() => {
//       router.push({ name: 'MainFeed'});
//  },300)
 
}

}

const uploadMedia = async (url) => {
  try {
    const file = await fetch(url).then((response) => response.blob())
    const fileExtension = url.includes('.mp4') ? 'mp4' : 'jpg'
    const fileName = `${uuidv4()}.${fileExtension}`
    const mediaFile = new File([file], fileName, { type: file.type })
    await uploadBytes(storageRef(mediaRef, fileName), mediaFile)
    return fileName
  } catch (error) {
    console.error('Error uploading media:', error)
    throw error
  }
}

const getImageDownloadURL = async (fileName) => {
  const fileRef = storageRef(mediaRef, fileName)
  try {
    const downloadURL = await getDownloadURL(fileRef)
    return downloadURL
  } catch (error) {
    console.error('Error getting image download URL:', error)
    throw error
  }
}

const getVideoDownloadURL = async (file) => {
  const downloadURL = await storageRef(mediaRef, file.name).getDownloadURL()
  return downloadURL
}

const saveBlogPost = async (imageURL, videoURL) => {
  const postDataWithMedia = {
    title: postData.value.title,
    text: postData.value.text,
    imageUrl: imageURL,
    videoUrl: videoURL,
    postTime: postDate,
    timestamp: serverTimestamp(),
    likes: 0,
    commentcount:0,
    userName: userNameId.value
    
  }

  const postListRef = firebaseRef(db, 'posts')
  const newPostRef = push(postListRef)
  set(newPostRef, postDataWithMedia)
}

const resetFormData = () => {
  imageUrl.value = null
  videoUrl.value = null
  postData.value.title = ''
  postData.value.text = ''
}
</script>

<!-- <script >
import { VueEditor } from "vue2-editor";

export default {
  components: {
    Editor: VueEditor
  },
  data() {
    return {
      content: "",
      editorOptions: {
        placeholder: "Enter your text here..."
        // You can add more options here as needed
      }
    };
  },
  methods: {
    saveContent() {
      // This method will save the content to your backend or perform any other action
      console.log(this.content);
    }
  }
};
</script> -->
