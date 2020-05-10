<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :first="first"
                :second="second"
                :third="third" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summa :meta="product"/>
      </el-col>
    </el-row>
    <el-row v-if="validList.length" class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="validList.length">
      <el-col :span="24">
        <list v-if="login"
              :more="validList" />
        <div v-else class="deal-need-login">
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看">
          <span>请登<nuxt-link :to="{path:'login'}">录后</nuxt-link>查看详细团购优惠</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import crumbs from "../components/detail/crumbs";
  import summa from "../components/detail/summary";
  import list from "../components/detail/list";
  export default {
    components: {
      crumbs,
      summa,
      list
    },
    computed: {
      validList () {
        return this.more.filter(item => item.photos.length)
      }
    },
    async asyncData(ctx) {
      const {city, keyword, type} = ctx.query
      const {status,data:{product,more,login}} = await ctx.$axios.get('/search/products',{
        params: {
          city,
          keyword
        }
      })
      if (status === 200){
        return {
          product,
          more,
          login,
          first: city+'美团',
          second: city+type,
          third: city+keyword
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>
