<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <category :areas="areas" :types="types" />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      地图
    </el-col>
  </el-row>
</template>
<script>
  import crumbs from "../components/products/crumbs"
  import category from "../components/products/category"
  import list from "../components/products/list"
  export default {
    components:{
      crumbs,
      category,
      list
    },
    data () {
      return {
        areas: [],
        types: [],
        list: []
      }
    },
    computed: {
      keyword () {
        return this.$store.state.product.keyword
      }
    },
    async mounted () {
      const {status,data:{areas,types}} = await this.$axios.get('/category/crumbs',{
        params: {
          city: this.$store.getters['geo/city'].replace('市','')
        }
      })
      const keyword = this.$store.state.product.keyword
      const {status:status2,data:{count,pois}} = await this.$axios.get('/search/resultsByKeywords',{
        params: {
          keyword,
          city: this.$store.getters['geo/city'].replace('市','')
        }
      })
      if ( status === 200 && status2 === 200 && count>0 ){
        this.areas = areas.filter(item => item.type !== '').slice(0,7)
        this.types = types.filter(item => item.type !== '').slice(0,5).map(item => {
          return {
            module: item.module,
            type: item.type === 'top'? '畅销': item.type
          }
        })
        this.list = pois.filter(item => item.photos.length).map(item => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            rating: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            tag: item.tag,
            tel: item.tel,
            status: '明日可订',
            location: item.location,
            module: item.type.split(';')[0],
            comment: Math.floor(Math.random()*1000),
            address: item.address
          }
        })

      }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/css/products/index.scss'
</style>
