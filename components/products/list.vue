<template>
  <div class="m-products-list">
    <dl>
      <dd v-for="item in nav"
          :key="item.name"
          :class="[item.name,item.active ? 's-nav-active':'']"
          @click="changeActive">
        {{item.txt}}
      </dd>
    </dl>
    <ul>
      <product v-for="(item,idx) in list"
            :key="idx"
            :product="item" />
    </ul>
  </div>
</template>

<script>
  import product from "./item"
  export default {
    components: {
      product
    },
    props: {
      list: {
        type: Array
      }
    },
    data () {
      return {
        nav: [
          {
            name: 's-default',
            txt: '智能排序',
            active: true
          }, {
            name: 's-price',
            txt: '价格排序',
            active: false
          }, {
            name: 's-visit',
            txt: '人气最高',
            active: false,
          }, {
            name: 's-comment',
            txt: '评价最高',
            active: false
          }
        ]
      }
    },
    methods: {
      changeActive (event) {
        const target = event.target.innerText
        this.nav.forEach(item => {
          item.active = false
          if (item.txt === target){
            item.active = true
          }
        })
      }
    }
  }
</script>
