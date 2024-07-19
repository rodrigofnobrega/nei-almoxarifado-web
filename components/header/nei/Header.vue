<template>
    <div class="header container-fluid d-flex justify-content-between align-items-center bg-primary p-0">  
      <div @mouseover="toolTip = true" @mouseout="toolTip = false" class=" align-items-center" :class="{'d-none': responsive}">
        <Brand class="ms-3"/>
        <TooltipsRectangular class="ms-5 ps-5 pt-2" :toolTipState="toolTip" :toolTipText="'Página Inicial'"/>
      </div> 
      <nav class="navbar navbar-expand py-0" style="width: 400px !important;">
          <div class="container-fluid">
            <ul class="navbar-nav d-flex">
                <a :class="{'navbar-active': currentRoute.fullPath === '/nei/'}" class="px-1 nav-item nav-link text-light" href="/nei/" type="button">Início</a>
                <a :class="{'navbar-active': currentRoute.fullPath === '/nei/catalogo'}" class="px-1 nav-item nav-link text-light" href="/nei/catalogo" type="button">Catálogo</a>
                <a :class="{'navbar-active': currentRoute.fullPath === '/nei/solicitacoes'}" class="px-1 nav-item nav-link text-light" href="/nei/solicitacoes" type="button">Solicitações</a>
                <a :class="{'navbar-active': currentRoute.fullPath === '/nei/configuracoes'}" class="px-1 nav-item nav-link text-light" href="/nei/configuracoes" type="button">Configurações</a>
                <a :class="{'navbar-active': currentRoute.fullPath === '/nei/sobre'}" class="px-1 nav-item nav-link text-light" href="/nei/sobre" type="button">Sobre</a>  
            </ul>
          </div>
      </nav>
      <div class="d-flex justify-content-end align-items-center">
          <ThemeSwitch />
          <IconsSearchGlass :class="{'d-none': !responsive}" class="mobile-search text-light" type="button" tabindex="-1" data-bs-target="#scrollableModal" data-bs-toggle="modal"/>
          <Profile />
      </div>     
      </div>
  </template>
  
<script>
import Brand from './Brand.vue'
import Profile from './Profile.vue'
import { useStorageStore } from "../../../stores/storage";
import { useRoute } from 'vue-router';
import ThemeSwitch from '../ThemeSwitch.vue';
export default{
    data(){
      return{
        responsive: false
      }
    },
    components: { Profile, Brand, ThemeSwitch },
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
      const toolTip = ref(false);
      const currentRoute = useRoute();
      const store = useStorageStore();
      return{
        store,
        toolTip,
        currentRoute
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
.nav-link{
  font-weight: bold;
}
.nav-item{
  padding-top: 12px;
  padding-bottom: 13px;
  transition: padding 0.2s ease-in-out,box-shadow 0.4s ease, border-bottom 0.4s ease-in-out;
}
.nav-item:hover{
  padding-top: 6px !important;
  padding-bottom: 19px !important;
  border-bottom: solid 1px #FED51E;
  box-shadow: inset 0px -12px 15px -13px rgb(254, 213, 30, 0.7);
  padding: 0px 0px 0px 0px;
}
.navbar-active{
  border-bottom: solid 1px #FED51E;
  box-shadow: inset 0px -12px 15px -13px rgb(254, 213, 30, 0.7);
}
.mobile-search{
  margin-top: 2.9px;
}
</style>
