<template>
  <div class="header container-fluid d-flex justify-content-between align-items-center bg-primary p-0">  
    <IconsMenu @click="expandSidebar()" class="d-none menu-color mx-3" :class="{'show-menu': responsive}"/>
    <div class="align-items-center" :class="{'d-none': responsive}" title="Página inicial">
      <Brand class="ms-3"/>
    </div> 
    <div class="d-flex justify-content-end align-items-center">
        <SearchBar :class="{'d-none': responsive}"/>
        <IconsSearchGlass :class="{'d-none': !responsive}" class="mobile-search text-light" type="button" tabindex="-1" data-bs-target="#scrollableModal" data-bs-toggle="modal"/>
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
import { useStorageStore } from "../../stores/storage";
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
          this.responsive = window.innerWidth <= 726;
          this.store.isResponsive = window.innerWidth <= 726;
          if(window.innerWidth === 726){
            this.store.responsive = false
          }
      },
      expandSidebar(){
        this.store.isMobileMenu = !this.store.isMobileMenu;
      }
    },
    setup(){
      const toolTip = ref(false)
      const store = useStorageStore();
      return{
        store,
        toolTip
      }
    }
}

</script>

<style scoped>
.menu-color{
  color: white !important;
}
.show-menu{
  margin: 11px 0px 11px 0px;
  width: 28px;
  height: 28px;
  display: block !important;
}
.header{
  position: fixed;
  z-index: 1050;
}
.mobile-search{
  margin-top: 2.9px;
}
</style>
