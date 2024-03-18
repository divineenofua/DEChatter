<template>
    <div class="contain">
      <SearchBar class="search-bar" />
      <SideNav class="side-nav" />
      <div class="post-container">
        <div class="post-content">
          <div class="post-box">
            <div class="btn">
              <button @click="saveData" type="submit">Publish</button>
            </div>
            <div class="content">
              <div class="image-container">
                <label for="addimage" class="custom-file-button">
                  <v-icon class="img-icon" name="bi-image" scale="1.9"/>
                </label>
                <input class="addImage" id="addImage" type="file" @change="handleFileInputChange">
              </div>
              <div class="video-container">
                <v-icon class="vid-icon" name="bi-camera-video" scale="1.9"/> 
                <input class="addVid" id="addVid" type="file" @change="handlevidInputChange">
              </div>
            </div>
          </div>
          <div class="main-content">
            <div class="file"> 
              <div v-if="imageUrl" class="img">
                <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image">
              </div>
              <div v-if="videoUrl" class="video"> 
                <video class="vid" v-if="videoUrl" controls style="max-width: 100%; max-height: 300px;">
                  <source :src="videoUrl" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div class="post-text">
              <textarea v-model="postData.title" class="post-texttitle" placeholder="Title"></textarea>
              <textarea v-model="postData.text" :rows="textareaRows" class="post-textarea" placeholder="Write a post....."></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
   import SideNav from '../SideNav.vue'
import SearchBar from '../SearchBar.vue'
  import { ref, computed } from 'vue';
  import {ref as firebaseRef, getDatabase, set, serverTimestamp } from "firebase/database";
  
  
  // get the initiliazed firebase real time database
  const db = getDatabase();
  
  
  const imageUrl = ref(null);
  const videoUrl = ref(null);
  const postData = ref({ title: '', text: '' });
  
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      imageUrl.value = URL.createObjectURL(file);
    }
  };
  
  const handlevidInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      videoUrl.value = URL.createObjectURL(file);
    }
  };
  
  const textareaRows = computed(() => Math.ceil(postData.value.text.length / 50));
  
  const saveData = () => {
  
    try {
      set(firebaseRef(db, 'blog'), {
      title: postData.value.title,
        text: postData.value.text,
        imageUrl: imageUrl.value,
        videoUrl: videoUrl.value,*6
        timeStamp : serverTimestamp()
    });
    resetFormData()
  
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };
  
  const resetFormData = () => {
    imageUrl.value = null;
    videoUrl.value = null;
    postData.value.title = '';
    postData.value.text = '';
  };
  
  </script>




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
                <v-icon class="img-icon" name="bi-image" scale="1.9"/>
              </label>
              <input class="addImage" id="addImage" type="file" @change="handleFileInputChange">
              <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image">
            </div>
            <div class="video-container">
              <v-icon class="vid-icon" name="bi-camera-video" scale="1.9"/> 
              <input class="addVid" id="addVid" type="file" @change="handlevidInputChange">
              <video v-if="videoUrl" :src="videoUrl" controls style="max-width: 100%; max-height: 300px;"></video>
            </div>
          </div>
        </div>
        <div class="main-content">
          <div class="post-text">
            <textarea v-model="postData.title" class="post-texttitle" placeholder="Title"></textarea>
            <textarea v-model="postData.text" :rows="textareaRows" class="post-textarea" placeholder="Write a post....."></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
   import SideNav from '../SideNav.vue'
import SearchBar from '../SearchBar.vue'
import { ref, computed } from 'vue';
import { getDatabase, ref as firebaseRef, set, serverTimestamp } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

const db = getDatabase();
const storage = getStorage();
const mediaRef = storageRef(storage, 'blogMedia');

const imageUrl = ref(null);
const videoUrl = ref(null);
const postData = ref({ title: '', text: '' });

const handleFileInputChange = async (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

const handlevidInputChange = async (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('video/')) {
    videoUrl.value = URL.createObjectURL(file);
  }
};

const textareaRows = computed(() => Math.ceil(postData.value.text.length / 50));

const publish = async () => {
  try {
    let imageData = null;
    let videoData = null;

    if (imageUrl.value) {
      const imageFile = await uploadMedia(imageUrl.value);
      imageData = await getImageDownloadURL(imageFile);
    }

    if (videoUrl.value) {
      const videoFile = await uploadMedia(videoUrl.value);
      videoData = await getVideoDownloadURL(videoFile);
    }

    await saveBlogPost(imageData, videoData);
    resetFormData();
  } catch (error) {
    console.error('Error publishing post:', error);
  }
};

const uploadMedia = async (url) => {
  const file = await fetch(url).then(response => response.blob());
  const fileName = url.includes('.mp4') ? 'video.mp4' : 'image.jpg';
  const mediaFile = new File([file], fileName, { type: file.type });
  const uploadTask = await uploadBytes(mediaRef.child(mediaFile.name), mediaFile);
  return uploadTask;
};

const getImageDownloadURL = async (file) => {
  const downloadURL = await file.ref.getDownloadURL();
  return downloadURL;
};

const getVideoDownloadURL = async (file) => {
  const downloadURL = await file.ref.getDownloadURL();
  return downloadURL;
};

const saveBlogPost = async (imageURL, videoURL) => {
  const postDataWithMedia = {
    title: postData.value.title,
    text: postData.value.text,
    imageUrl: imageURL,
    videoUrl: videoURL,
    timestamp: serverTimestamp()
  };
  await set(firebaseRef(db, 'blogPosts').push(), postDataWithMedia);
};

const resetFormData = () => {
  imageUrl.value = null;
  videoUrl.value = null;
  postData.value.title = '';
  postData.value.text = '';
};
</script>

  