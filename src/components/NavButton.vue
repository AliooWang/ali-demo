<template>
    <div class='page-view'>
      <router-link
        tag="button"
        to="/"
      >
        Home
      </router-link>
      <router-link
        tag="button"
        to="/about"
      >
        Editor
      </router-link>
      <router-link
        tag="button"
        to="/sku"
      >
        Sku
      </router-link>
    </div>
</template>
      
<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
    data() {
      return{}
    },
    methods:{}
})
</script>
      
<style lang='scss' scoped>
.page-view {
  min-height: 100%;
}
</style>