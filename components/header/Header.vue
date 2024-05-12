<template>
  <Popup :isPopup="isPopup" :popupText="popupText" :popupBg="popupBg"/>
  <div class="header container-fluid d-flex justify-content-between align-items-center bg-primary p-0">  
    <IconsMenu @click="expandSidebar()" class="d-none teste2 mx-3" :class="{'teste': responsive}"/>
    <div class="align-items-center" :class="{'d-none': responsive}">
      <Brand class="ms-3"/>
    </div> 
      <div class="d-flex justify-content-end align-items-center">
        <SearchBar :class="{'d-none': responsive}"/>
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
import { useStorageStore } from "../../stores/storage";
import { computed, popScopeId } from "vue";
export default{
    data(){
      return{
        responsive: false
      }
    },
    components: { SearchBar, Brand, ThemeSwitch, Profile },
    mounted(){
      window.addEventListener('resize', this.mobileMode)
      this.mobileMode()
    },
    methods: {
      mobileMode(){
          this.responsive = window.innerWidth <= 669;
      },
      expandSidebar(){
        this.store.isMobile = !this.store.isMobile;
        console.log(this.store.isMobile)
      }
    },
    setup(){
      const store = useStorageStore();
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
        popupBg,
        store
      }
    }
}

</script>

<style scoped>
.teste2{
  color: white !important;
}
.teste{
  margin: 11px 0px 11px 0px;
  width: 28px;
  height: 28px;
  display: block !important;
}
.header{
  position: fixed;
  z-index: 1050;
}
</style>
