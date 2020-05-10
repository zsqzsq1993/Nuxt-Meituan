<template>
  <div class="m-geo">
    <i class="el-icon-location" /><span>{{city}} {{province}}</span>
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        city: '',
        province: ''
      }
    },
    mounted () {
      this.city =  this.$store.getters['geo/city']
      this.province = this.$store.getters['geo/province']
    }
  }
</script>
