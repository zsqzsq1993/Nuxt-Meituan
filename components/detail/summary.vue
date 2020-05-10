<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{meta.name}}</h1>
      <el-rate v-model="rate" disabled />
      <span>{{rate}}</span>
      <span>{{price}}</span>
      <ul>
        <li>地址：{{meta.address}}</li>
        <li>电话：{{meta.tel}}</li>
      </ul>
    </dt>
    <dd>
      <el-carousel height="214px"
                   indicator-position="none">
        <el-carousel-item v-for="(item,idx) in meta.photos"
                          :key="idx">
          <h3>
            <img :src="item.url"
                 :alt="meta.title"
                 width="100%"
                 height="100%" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </dd>
  </dl>
</template>

<script>
  export default {
    props:{
      meta: {
        type: Object,
        default: ()=>{
          return {}
        }
      }
    },
    computed: {
      rate () {
        return Number(this.meta.biz_ext.rating) || Math.floor(Math.random()*5)
      },
      price () {
        return ('人均¥' + Number(this.meta.biz_ext.cost)) || '暂无报价'
      }
    }
  }
</script>
