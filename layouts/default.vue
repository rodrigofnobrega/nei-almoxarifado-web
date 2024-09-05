<template>
  <div id="content">
    <Header />
    <div class="d-flex bg-fade"> 
      <div class="fluid-container"> 
        <NavbarNavSideBar />
      </div>
      <div class="main">
        <div class="main-title mt-5">
          <TitlesTitle>
            <template v-slot:titulo>
                <div class="d-flex align-items-center">
                  <IconsSpreadSheet v-if="pageIcon === 'spreadsheet'" class="title-icon" width="30px" height="30px"/>
                  <IconsControl v-else-if="pageIcon === 'control'" class="title-icon" width="30px" height="30px"/>
                  <IconsDirectory v-else-if="pageIcon === 'directory'" class="title-icon" width="30px" height="30px"/>
                  <IconsSettings v-else-if="pageIcon === 'settings'" class="title-icon" width="30px" height="30px"/>
                  <IconsInformation v-else-if="pageIcon === 'information'" class="title-icon" width="30px" height="30px"/>
                  <IconsHome v-else-if="pageIcon === 'home'" width="30px" class="title-icon" height="30px"/>
                  <span class="ms-2">
                    {{ pageTitle }}
                  </span>
                </div>
		        </template>
            <template v-slot:rota>
              <li v-for="(route, index) in pageRoute" :key="index" class="breadcrumb-item active" aria-current="page">
                <a type="button" :href="`/${route}`"> {{ route }} </a>
              </li>
            </template>
          </TitlesTitle>
        </div>
        <div class="main-content d-flex justify-content-center">
          <slot  />
        </div>
      </div> 
    </div>
    <div class="d-flex">
      <div class="flex-grow-1">
        <Footer />
      </div>
    </div>
  </div>
</template>
  
<script >
import { ref, provide, inject } from 'vue';
import { useStorageStore } from '../stores/storage';


export default {
  data(){
    return{
      loadContent: false
    }
  },
  mounted(){
    this.loadContent = true;
  },
  setup() {
    const store = useStorageStore();
    const pageTitle = ref('');
    const pageRoute = ref('');
    const pageIcon = ref('');
    const pageOptions = ref();
    provide('setpageTitle', (title, route, icon) => {
      pageTitle.value = title;
      pageRoute.value = route.split('/');
      pageIcon.value = icon;
    });

    return {
      pageTitle,
      pageRoute,
      pageIcon,
      store
    };
  },
};
</script>

<style>
#content{
  background-color: #f3f4f7;
}
.main{
  width: 100%;
  height: 100%;
}
.main-title{
  white-space: nowrap;
  padding: 0;
  margin: 51px 0px 0px 0px;
}
/*
.main-content{
  width: 86vw;
  margin-left: 11px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 3vw;
  padding-left: 0px;
  padding-right: 0px;
} */
.fluid-container{
  position: static;
}
.action-btn{
    margin-right: 10px;
}
.route-link{
    color: rgba(51, 51, 51, 1)
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
.route-link:hover{
  color: rgba(51, 51, 51, 0.6)
}
@media screen and (max-width: 600px){
  .title-icon{
    width: 25px;
    height: 25px;
  }
}

</style>