<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col class="left" :span="3">
        <a href="/"><img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团"></a>
      </el-col>
      <el-col class="center" :span="15">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点"
                    v-model="search"
                    @focus="focus"
                    @blur="blur"
                    @input="input"></el-input>
          <button class="el-button el-button--primary"
                  @click="products(search)">
            <i class="el-icon-search" />
          </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in hots"
                        :key="index"
                        @click="products(item.name)">{{item.name}}</dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item,index) in searchList"
                        :key="index"
                        @click="products(item.name)">{{item.name}}</dd>
          </dl>
        </div>
        <p class="suggest">

        </p>
        <ul class="nav">
          <li><nuxt-link
            to="/"
            class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col class="right" :span="6"></el-col>
    </el-row>
  </div>
</template>
<script>
  import _ from 'lodash'
  export default {
    data () {
      return{
        isFocus: false,
        search: '',
        searchList: [],
        hots: []
      }
    },
    computed: {
      isHotPlace: function () {
        return this.isFocus && !this.search
      },
      isSearchList: function () {
        return this.isFocus && this.search
      },
    },
    async mounted () {
      const self = this
      const city = self.$store.getters['geo/city'].replace('市','')
      const {status:status3,data:{hots}} = await self.$axios.get(`/search/hotPlace`,{
        params: {
          city
        }})
      if (status3 === 200){
        this.$store.commit('home/setHots',hots)
      }
      this.hots = hots.slice(0,5)
    },
    methods: {
      focus: function () {
        this.isFocus = true
      },
      blur: function () {
        let self = this;
        setTimeout(function () {
          self.isFocus = false
        },200)
      },
      input: _.debounce(async function(){
        const self = this
        const city = self.$store.getters['geo/city'].replace('市','')
        const {status,data:{top}} = await this.$axios.get('/search/top',{
          params: {
            city,
            input: self.search
          }
        })
        this.searchList = top.slice(0,10)
      },200),
      products (keyword) {
        this.$store.commit('product/setKeyword',keyword)
        location.href = '/products'
      }
    }
  }
</script>

