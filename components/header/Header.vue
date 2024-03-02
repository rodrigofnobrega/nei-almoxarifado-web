<template>
    <div class="header container-fluid d-flex justify-content-between align-items-center bg-primary">  
      <div class="d-flex align-items-center">
        <Brand />
        <SearchBar />
        <ModalBackDrop />
      </div> 
      <div class="d-flex justify-content-end align-items-center">
        <ThemeSwitch />
        <Profile />
      </div>     
    </div>
</template>

<script>
import SearchBar from "./search/SearchBar.vue";
import Brand from "./Brand.vue";
import ThemeSwitch from "./theme_switch/ThemeSwitch.vue";
import Profile from "./profile/Profile.vue";
export default{
    components: { SearchBar, Brand, ThemeSwitch, Profile }
}

</script>

<style scoped>
.header{
  position: fixed;
  z-index: 1050;
}

</style>
