<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">美团</el-breadcrumb-item>
      <el-breadcrumb-item>{{city1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{city2}}{{ keyword }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        city1: '',
        city2: ''
      }
    },
    props: {
      keyword:{
        type: String,
      }
    },
    mounted() {
      this.city1 = this.$store.getters['geo/city'].replace('市','')+'美团'
      this.city2 = this.$store.getters['geo/city'].replace('市','')
    }
  }
</script>
