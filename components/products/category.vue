<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="item in types"
          :key="item.type">
        <iselect :name="item.type"
                 :list="item.module"/>
      </dd>
    </dl>
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="item in areas"
          :key="item.type">
        <iselect :name="item.type"
                 :list="item.module"/>
      </dd>
    </dl>
  </div>
</template>
<script>
  import iselect from './iSelect'
  export default {
    props: {
      areas: {
        type: Array
      },
      types: {
        type: Array
      }
    },
    components: {
      iselect
    }
  }
</script>
