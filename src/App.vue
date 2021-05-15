<template>
  <div id="app">
    <notifications group="notify" position="bottom left"/>
    <div class="container">
      <div class="nav">
        <div class="nav-brand white--text">رخش</div>
        <router-link class="nav-links" to="/user/add" >ایجاد کاربر جدید</router-link> 
        <router-link class="nav-links" to="/user/list">لیست کاربران</router-link>
      </div>
      <router-view />
    </div>
    
    
  </div>
</template>


<script>
import './assets/css/style.css';
import './assets/css/responsive.css';
import './assets/css/fonts.css';
export default {
  
}
</script>
