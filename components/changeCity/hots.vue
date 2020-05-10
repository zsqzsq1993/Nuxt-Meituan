<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="(item,idx) in list"
          :key="idx">
        <a href="#" @click.prevent="change">{{item.name}}</a>
      </dd>
    </dl>
  </div>
</template>
<script>
  import sessionStorage from 'sessionstorage'
  export default {
    data () {
      return {
        list: []
      }
    },
    methods: {
      async change (event) {
        const name = event.target.innerHTML
        const self = this
        const {status,data:{city}} = await self.$axios.get('/geo/city')
        const province = city.filter(item => item.name === name)[0].province
        if (status === 200){
          await this.$store.commit('geo/setCity',name)
          await this.$store.commit('geo/setProvince',province)
          location.href = ('/')
        }
      }
    },
    mounted: async function () {
      const {status,data:{hots}} = await this.$axios.get('/geo/hotCity')
      if (status === 200){
        this.list = hots
      }else{
        this.list = []
      }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/css/changecity/hot.scss'
</style>
