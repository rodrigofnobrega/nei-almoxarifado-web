<template>
    <div id="content">
        <Header />
        <div class="d-flex">
          <div class="main">
              <div class="main-title">
                <TitlesTitle>
                  <template v-slot:titulo>
                      <div class="d-flex align-items-center">
                        <IconsProfile v-if="pageTitle" width="30px" height="30px"/>
                        <span class="ms-2">
                          {{pageTitle}}
                        </span>
                      </div>
                  </template>
                  <template v-slot:rota>
                    <li class="breadcrumb-item active" aria-current="page">
                      <a class="route-link text-decoration-none" type="button" :href="pageRoute">{{ pageRoute.replace('/', '') }}</a>
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
      pageRoute.value = route;
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