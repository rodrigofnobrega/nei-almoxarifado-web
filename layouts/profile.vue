<template>
    <div id="content">
        <Header />
        <div class="d-flex">
          <div class="main">
              <div class="main-title">
                <TitlesTitle>
                  <template v-slot:titulo>
                      <div class="d-flex align-items-center">
                        <IconsSpreadSheet v-if="pageIcon === 'spreadsheet'" width="30px" height="30px"/>
                        <IconsControl v-if="pageIcon === 'control'" width="30px" height="30px"/>
                        <IconsDirectory v-if="pageIcon === 'directory'" width="30px" height="30px"/>
                        <IconsSettings v-if="pageIcon === 'settings'" width="30px" height="30px"/>
                        <IconsInformation v-if="pageIcon === 'information'" width="30px" height="30px"/>
                        <IconsHome v-if="pageIcon === 'home'" width="30px" height="30px"/>
                        <span class="ms-2">
                          {{ pageTitle }}
                        </span>
                      </div>
		              </template>
                  <template v-slot:rota>
                    <li v-for="(route, index) in pageRoute" :key="index" class="breadcrumb-item active" aria-current="page">
                      <a type="button" :href="route"> {{ route }} </a>
                    </li>
                  </template>
                </TitlesTitle>
              </div>
              <div class="main-content pb-5 d-flex justify-content-center">
                <slot />
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
  setup() {
    const pageTitle = ref('');
    const pageRoute = ref('');
    provide('setpageTitle', (title, route) => {
      pageRoute.value = route.split('/');
      pageTitle.value = title;
    });

    return {
      pageRoute,
      pageTitle
    };
  },
};
</script>

<style scoped>
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
</style>