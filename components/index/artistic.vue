<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd class="{active:kind === 'all'}"
          kind="all"
          keyword="景点">全部</dd>
      <dd class="{active:kind === 'part'}"
          kind="part"
          keyword="美食">约会聚餐</dd>
      <dd class="{active:kind === 'spa'}"
          kind="spa"
          keyword="丽人">丽人SPA</dd>
      <dd class="{active:kind === 'movie'}"
          kind="movie"
          keyword="电影">电影演出</dd>
      <dd class="{active:kind === 'travel'}"
          kind="travel"
          keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item,idx) in current"
          :key="idx">
        <el-card :body-style="{padding: '0px'}"
                  shadow="never">
          <img :src="item.img" :alt="item.title">
          <ul class="cbody">
            <li class="title">{{item.title}}</li>
            <li class="pos"><span>{{item.pos}}</span></li>
            <li class="price">评分: <em>{{item.price}}</em></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        kind: 'all',
        list: {
          all: [],
          part: [],
          spa: [],
          movie: [],
          travel: []
        }
      }
    },
    computed: {
      current: function () {
        return this.list[this.kind]
      }
    },
    async mounted() {
      const self = this
      const {status, data: {count, pois}} = await self.$axios.get('/search/resultsByKeywords', {
        params: {
          keyword: self.kind,
          city: self.$store.getters['geo/city'].replace('市', '')
        }
      })
      if (status === 200 && count > 0) {
        self.list[self.kind] = pois.filter(item => item.photos.length).map(item => {
          return {
            title: item.name,
            pos: item.type.split(';')[0],
            price: item.biz_ext.rating[0] || '暂无',
            img: item.photos[0].url
          }
        }).slice(0, 9)
      }
    },

    methods: {
      over: async function (event) {
        const self = this
        const target = event.target
        const tagName = target.tagName.toLowerCase()
        if (tagName === 'dd'){
          self.kind = target.getAttribute('kind')
          const {status,data:{count,pois}} = await self.$axios.get('/search/resultsByKeywords',{
            params: {
              keyword: self.kind,
              city: self.$store.getters['geo/city'].replace('市', '')
            }
          })
          if (status === 200 && count > 0 ){
            self.list[self.kind] = pois.filter(item => item.photos.length).map(item => {
              return {
                title: item.name,
                pos: item.type.split(';')[0],
                price: item.biz_ext.rating[0] || '暂无',
                img: item.photos[0].url
              }
            }).slice(0,9)
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/css/index/artistic.scss'
</style>
