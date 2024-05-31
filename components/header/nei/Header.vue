<template>
    <div class="header container-fluid d-flex justify-content-between align-items-center bg-primary p-0">  
      <div @mouseover="toolTip = true" @mouseout="toolTip = false" class="align-items-center" :class="{'d-none': responsive}">
        <Brand class="ms-3"/>
        <TooltipsRectangular class="ms-5 ps-5 pt-2" :toolTipState="toolTip" :toolTipText="'Página Inicial'"/>
      </div> 
      <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <ul class="navbar-nav d-flex">
                <li class="nav-item">
                    <a class="nav-link text-light" href="/nei/catalogo" type="button">Catálogo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="/nei/solicitacoes" type="button">Solicitações</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="/nei/configuracoes" type="button">Configurações</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="/nei/sobre" type="button">Sobre</a>
                </li>
            </ul>
          </div>
      </nav>
      <div class="d-flex justify-content-end align-items-center">
          <IconsSearchGlass :class="{'d-none': !responsive}" class="mobile-search text-light" type="button" tabindex="-1" data-bs-target="#scrollableModal" data-bs-toggle="modal"/>
          <Profile />
        </div>     
      </div>
  </template>
  
<script>
import Brand from './Brand.vue'
import Profile from './Profile.vue'
import { useStorageStore } from "../../../stores/storage";
export default{
    data(){
      return{
        responsive: false
      }
    },
    components: { Profile, Brand },
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
