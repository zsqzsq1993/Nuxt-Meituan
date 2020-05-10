<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item,idx) in list"
          :key="item">
        <a :href="'#city-'+item">{{item}}</a>
      </dd>
    </dl>
    <dl class="m-categroy-section"
        v-for="block in blocks"
        :key="block.title"
        >
      <dt
        :id="'city-'+ block.title">{{block.title}}</dt>
      <dd>
        <span v-for="city in block.list"
              :key="city">
          <a href="#" @click.prevent="change">{{city}}</a>
        </span>
      </dd>
    </dl>
  </div>
</template>
<script>
  import pinyin from 'js-pinyin'
  export default {
    data () {
      return {
        list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        blocks: []
      }
    },
    methods: {
      async change (event) {
        const name = event.target.innerHTML
        const self = this
        const {status,data:{city}} = await self.$axios.get('/geo/city')
        if (status === 200){
          await self.$store.commit('geo/setProvince',city.filter(item => item.name === name)[0].province)
          await self.$store.commit('geo/setCity',name)
          location.href = '/'
        }
      }
    },
    async mounted () {
      const self = this
      const {status,data:{city}} = await self.$axios.get('/geo/city')
      if (status === 200){
        let p, c;
        let tempt = {};
        city.forEach(item => {
          p = pinyin.getFullChars(item.name).slice(0,1).toUpperCase()
          c = p.charCodeAt(0)
          if (c>64 && c<91){
            if (!tempt[p]){
              tempt[p] = []
            }
            tempt[p].push(item.name)
          }
        })
        for (let [k,v] of Object.entries(tempt)){
          self.blocks.push({
            title: k,
            list: v
          })
        }
        self.blocks.sort((a,b) => {
          return (a.title.charCodeAt(0) - b.title.charCodeAt(0))
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/css/changecity/categroy.scss'
</style>
