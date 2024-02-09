 <template>
  <div class="navBar">
    <nav>
      <RouterLink :to="{ name:'SignPage' }" 
       active-class="active"
        ><div class="nav-item">
          <span class="prev "  >Register</span>
          <div class="log"  ></div></div
      ></RouterLink>
      <RouterLink  :to="{ name:'LoginPage'}"  active-class="active">
        <div class="nav-item">
          <span class="next "  >Log In</span>
          <div  class="log" ></div>
        </div>
      </RouterLink>
    </nav>
  </div>
</template>
<script setup>
 
 </script>