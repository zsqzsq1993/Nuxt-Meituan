<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>{{first}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{third}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    props: {
      first: {
        type: String
      },
      second: {
        type: String
      },
      third: {
        type: String
      }
    }
  }
</script>
