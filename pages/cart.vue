<template>
  <div class="page-cart">
    <el-row>
      <el-col :span="24" class="m-cart" v-if="cart.length">
        <list :cartData="cart"/>
        <p>
          应付金额：<em class="money">¥{{total}}</em>
        </p>
        <div class="post">
          <el-button type="primary"
                     @click="submit">
            提交订单
          </el-button>
        </div>
      </el-col>
      <el-col :span="24" class="empty" v-else>购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
  import list from '../components/cart/list'
  export default {
    components: {
      list
    },
    methods: {
      async submit() {
        const self = this
        const {status,data} = await this.$axios.post('/order/createOrder',{
          cartNo: self.cartNo,
          total: self.total,
          count: self.cart[0].count
        })
        if ( status === 200 && data.code === 0){
          await self.$alert(`恭喜您，已成功下单，订单号为${data.id}`,'下单成功',{
            confirmButtonText: '确定',
            callback: action => {
              location.href = '/order'
            }
          })
        }
      }
    },
    computed: {
      total() {
        return this.cart[0].count * this.cart[0].price
      }
    },
    async asyncData(ctx) {
      const cartNo = ctx.query.id
      const {status,data:{data:{price,name},code}} = await ctx.$axios.post('/cart/getCart',{id: cartNo})
      if ( status == 200 && code ==0 ){
        return {
          cart: [{
            price,
            name,
            count: 1
          }],
          cartNo
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
