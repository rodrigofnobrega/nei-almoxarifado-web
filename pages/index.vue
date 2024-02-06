<!--xs(0-576), sm(576px, 768px), md(768px, 992px), lg(992px, 1200px), xl(1200px, >)--> 
<template>
  <Header></Header>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../layouts/Header.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Header
  }
})
</script>
