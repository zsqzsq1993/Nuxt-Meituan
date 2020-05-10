<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{name}} <i class="el-icon-arrow-down el-icon--right" /></dt>
      <dd>
        <h3>{{name}}</h3>
        <span v-for="item in list.slice(0,10)"
              :key="item">
          {{item}}
        </span>
      </dd>
    </dl>
  </div>
</template>
<script>
  export default {
    props: {
      name: {
        type: String
      },
      list: {
        type: Array
      }
    }
  }
</script>
