<template>
    <Popup :isPopup="isPopup" :popupText="popupText" :popupBg="popupBg"/>
    <div class="header container-fluid d-flex justify-content-between align-items-center bg-primary p-0">  
      <div class="d-flex align-items-center">
        <Brand class="ms-3"/>
      </div> 
      <div class="d-flex justify-content-end align-items-center">
        <SearchBar />
        <!--<ThemeSwitch />-->
        <ModalSearch />
        <Profile />
      </div>     
    </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import Brand from "./Brand.vue";
import ThemeSwitch from "./ThemeSwitch.vue";
import Profile from "./Profile.vue";
import { usePopupStore } from "~/stores/popup";
import { computed, popScopeId } from "vue";
export default{
    components: { SearchBar, Brand, ThemeSwitch, Profile },
    setup(){
      const popup = usePopupStore();
      const isPopup = computed(() => {
          return popup.popupActive
      });
      const popupText = computed(() => {
        return popup.message
      });
      const popupBg = computed(() => {
        return popup.bgColor
      })
      return{
        isPopup,
        popupText,
        popupBg
      }
    }
}

</script>

<style scoped>
.header{
  position: fixed;
  z-index: 1050;
}
</style>
