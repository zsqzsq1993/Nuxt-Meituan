<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <h3>我的美团</h3>
        <dl>
          <dt>我的订单</dt>
          <dd>全部订单<i class="el-icon-arrow-right"/></dd>
          <dd>待付款<i class="el-icon-arrow-right"/></dd>
          <dd>待使用<i class="el-icon-arrow-right"/></dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd>收藏的商家<i class="el-icon-arrow-right"/></dd>
          <dd>收藏的团购<i class="el-icon-arrow-right"/></dd>
        </dl>
        <dl>
          <dt>抵用券</dt>
          <dd>可用券<i class="el-icon-arrow-right"/></dd>
          <dd>失效券<i class="el-icon-arrow-right"/></dd>
        </dl>
        <dl>
          <dt>个人信息</dt>
          <dd>账户设置<i class="el-icon-arrow-right"/></dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="all">
            <list :list="list" :now="activeName"/>
          </el-tab-pane>
          <el-tab-pane label="待付款" name="unpay">
            <list :list="cur" :now="activeName"/>
          </el-tab-pane>
          <el-tab-pane label="已付款" name="paid">
            <list :list="cur" :now="activeName"/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import list from '../components/order/list'
  export default {
    components: {
      list
    },
    data () {
      return {
        activeName: 'all',
        cur: []
      }
    },
    watch: {
      activeName () {
        let name
        if (this.activeName === 'all'){
          this.cur = []
          return
        }else if(this.activeName === 'unpay'){
          name = 0
        }else{
          name = 1
        }
        this.cur = this.list.filter(item => item.status === name)
      }
    },
    methods: {
      handleClick (tab) {
        this.activeName = tab.name
      }
    },
    async asyncData(ctx){
      const {status,data:{code,list}} = await ctx.$axios.post('/order/getOrder')
      if ( status === 200 && code === 0){
        return {
          list: list.map(item => {
            return {
              id: item.id,
              img: item.imgs[0].url,
              name: item.name,
              count: item.count,
              total: item.total,
              status: item.status,
              statusTxt: item.status === 0? '待付款':'已付款'
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/css/order/index.scss'
</style>
