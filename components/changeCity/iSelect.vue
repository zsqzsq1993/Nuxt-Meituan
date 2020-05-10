<template>
  <div class="m-iSelect">
    <span>按省份选择: </span>

    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="[item.value,item.label]">
      </el-option>
    </el-select>

    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.label">
      </el-option>
    </el-select>

    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市名"
      @select="handleSelect"
    />

  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    data() {
      return {
        input: '',
        pvalue: '',
        cvalue: '',
        province: [],
        city: [],
        cities: []
      }
    },
    mounted: async function () {
      const {status, data: {province}} = await this.$axios.get('/geo/province')
      if (status === 200) {
        this.province = province.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    },
    watch: {
      pvalue: async function () {
        const {status, data: {city}} = await this.$axios.get(`/geo/province/${this.pvalue[0]}`)
        if (status === 200) {
          this.city = city.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          this.cvalue = ''
        }
      },
      cvalue: async function() {
        const self = this
        if (this.cvalue === '') return false
        const {status, data: {city}} = await self.$axios.get('/geo/city')
        await self.$store.commit('geo/setProvince',city.filter(item => item.name === this.cvalue)[0].province)
        await self.$store.commit('geo/setCity',this.cvalue)
        location.href = '/'
      },
      input: async function() {
      },
    },
    methods: {
      querySearchAsync: _.debounce(async function (query, cb) {
        const self = this
        if (self.cities.length) {

        } else {
          const {status, data: {city}} = await self.$axios.get('/geo/city')
          if (status === 200) {
            self.cities = city.map(item => {return {
              value: item.name
            }})
          }else{
            sefl.cities = []
          }
        }
        cb(self.cities.filter(item => item.value.indexOf(query) > -1))
      },150),

      handleSelect: async function (selectCity) {
        const self = this
        if (this.input === '') return false
        const {status,data:{city}} = await self.$axios.get('/geo/city')
        await self.$store.commit('geo/setProvince',city.filter(item => item.name === selectCity.value)[0].province)
        await self.$store.commit('geo/setCity',this.input)
        location.href = '/'
      }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/css/changecity/iselect.scss'
</style>
