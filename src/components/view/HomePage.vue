<template>
  <div>
    <div class="navit"> 
    <div class="nav-header">
      <div class="logo">CHATTER</div>
       
      <nav>
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#About-us">About Us</a></li>
          <li><a href="#Contact">Contact</a></li>
          <li><a href="#Blog">Blog</a></li>
        </ul>
      </nav>
      <v-icon @click="showMenu" class="menu-bar" name="px-menu" scale="1.8" />
      <div class="btns">
      
        <RouterLink :to="{name:'LoginPage'}"><button>Log In</button></RouterLink>
        <RouterLink :to="{name:'SignPage'}"><button class="btn-diff">Sign Up</button></RouterLink>
         
         
      </div>
    </div>
    </div>


    <div class="sidebar" v-bind:class="{active: isActive}"> 
      <nav>
        <v-icon @click="closeMenu" class="close-bar" name="fa-times" scale="1.8" />
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#About-us">About Us</a></li>
          <li><a href="#Contact">Contact</a></li>
          <li><a href="#Blog">Blog</a></li>
        </ul>
      </nav>
      <div class="btns">
        <RouterLink class="side-btn" :to="{name:'LoginPage'}"> <div  > Log In</div>  </RouterLink>
        <RouterLink class="side-btn" :to="{name:'SignPage'}"><div   >Sign Up</div> </RouterLink>
         
         
      </div>
    
    </div>






    <div id="Home" class="home-header">
      <div class="header-items">
        <h1>Welcome to Chatter: A Haven for Text-Based Content</h1>
        <p>Unleash the Power of Words, Connect with Like-minded Readers and Writers</p>
        <RouterLink class="side-btn" :to="{name:'SignPage'}"> <button class="btn-item">Get started</button></RouterLink>
      </div>
    </div>
    <!-- About section -->
    <div class="about" id="About-us">
      <div class="about-container">
        <div class="about-text">
          <h3>About Chatter</h3>
          <p>
            Chatter is a multi-functional platform where authors and readers can have access to
            their own content. It aims to be a traditional bookworm’s heaven and a blog to get
            access to more text based content. Our vision is to foster an inclusive and vibrant
            community where diversity is celebrated. We encourage open-mindedness and respect for
            all individuals, regardless of their backgrounds or beliefs. By promoting dialogue and
            understanding, we strive
          </p>
        </div>
        <div class="about-image">
          <img
          src="/src/assets/christina-wocintechchat-com-c5pRBXFhJgo-unsplash.jpg"            alt="chatter team members"
          />
        </div>
      </div>
    </div>

    <div class="know-more">
        <div class="know-container">
            <h3>Why you should join chatter</h3>
     <p>Our goal is to make writers and readers see our platform as their next heaven for blogging, ensuring ease in interactions, connecting with like-minded peers, have access to favorite content based on interests and able to communicate your great ideas with people
</p>
<div class="know-contents">
    <div class="know-items">
    <div class="logo"><v-icon name="co-chart-line" class="log"   scale="1.7" /></div>
    <span>Analytics</span>
    <p>Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time
</p>
</div>

<div class="know-items">
    <div class="logo"><v-icon name="bi-people-fill" scale="1.7"  /></div>
    <span>Social interactions</span>
    <p>Users on the platform can interact with posts they like, comment and engage in discussions
</p>
</div>

<div class="know-items">
    <div class="logo"> <v-icon name="co-newspaper" scale="1.7" /></div>
    <span>Content creation</span>
    <p>Write nice and appealing with our in-built markdown, a rich text editor</p>
</div>
</div>


        </div>
    </div>
<!-- join chatter -->
    <div class="join-chatter">
        <div class="join-content">
            <div class="image">
                <img src="/src/assets/stefan-stefancik-QXevDflbl8A-unsplash.jpg" alt=" A Woman">
            </div>
            <div class="text">
                <blockquote>"Chatter has become an integral part of my online experience. As a user of this incredible blogging platform, I have discovered a vibrant community of individuals who are passionate about sharing their ideas and engaging in thoughtful discussions.”
</blockquote>
                <span>Adebobola Muhydeen, <small> Software developer at Apple </small></span>
                <button class="btn-item">Join Chatter</button>
            </div>
        </div>
    </div>
<!-- know our team -->
    <div class="team">
        <div class="team-content">
            <div class="team-image">
                <div class="mage">
                    <img  class="image-item" src="/src/assets/stefan-stefancik-QXevDflbl8A-unsplash.jpg" alt="">
                    <img class="image-item" src="/src/assets/prince-akachi-J1OScm_uHUQ-unsplash.jpg" alt="">
                </div>
               <div><img class="image-item" src="/src/assets/jassir-jonis-QWa0TIUW638-unsplash.jpg" alt=""></div>  

            </div>
            <div class="team-text">
<h3>Write, read and connect with great minds on chatter</h3>
<p>Share people your great ideas, and also read write-ups based on your interests. connect with people of same interests and goals  
</p>
<button class="btn-item">Get started</button>
            </div>
        </div>
    </div>
    <footer id="Contact" class="contact">
        <div class="contact-container"> 
        <div class="logo">CHATTER</div>
        <div class="contact-content">
            <div class="items">
                <h3>Explore</h3>
                <ul>
                    <li><a href="#">community</a></li>
                    <li><a href="#">Trending blogs</a></li>
                    <li><a href="#">Chatter for teams</a></li>
                   
                </ul>
            </div>
        </div>
        <div class="contact-content">
            <div class="items">
                <h3>Support</h3>
                <ul>
                    <li><a href="#">Support docs</a></li>
                    <li><a href="#">Join slack</a></li>
                    <li><a href="#">Contact</a></li> 
                </ul>
            </div>
        </div>
        <div class="contact-content">
            <div class="items">
                <h3>Official blog</h3>
                <ul>
                    <li><a href="#">Official blog</a></li>
                    <li><a href="#">Engineering blog</a></li>
                 
                </ul>
            </div>
        </div>
    </div>
    </footer>
  </div>
</template>


 
<script setup>
import { ref } from 'vue'
const isActive = ref();
const showMenu = () => {
   isActive.value = true;
}
const closeMenu = () => {
   isActive.value = false;
}

//const { RouterLink } = require('vue-router');
</script>
