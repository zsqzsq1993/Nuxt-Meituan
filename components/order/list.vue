<template>
  <div class="m-order">
    <ul>
      <li v-if="list.length">
        <el-row v-for="(item,idx) in list"
                :key="idx">
          <el-col :span="4">
            <img :src="item.img" :alt="item.name">
          </el-col>
          <el-col :span="10">
            <h4>{{item.name}}</h4>
            <p>数量：{{item.count}}</p>
          </el-col>
          <el-col :span="4">
            总价：¥{{item.total}}
          </el-col>
          <el-col :span="6">
            <template v-if="now === 'all'">
              {{item.statusTxt}}
            </template>
            <template v-else-if="now !== 'all' && item.status === 0">
              {{item.statusTxt}}
              <a href="#" class="newClick" @click.prevent="pay(item.id)">点击支付</a>
            </template>
            <template v-else>
              {{item.statusTxt}}
              <a href="#" class="newClick" @click.prevent="drop(item.id)">点击删除</a>
            </template>
          </el-col>
        </el-row>
      </li>
      <li v-else class="empty">没有订单</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
      now: {
        type: String,
        default: () => {
          return ''
        }
      }
    },
    methods: {
      async pay (id) {
        const {status,data:{code}} = await this.$axios.post('/order/changeStatus',{id})
        if (status === 200 && code === 0){
          this.$alert('您已成功支付','支付成功',{
            confirmButtonText: '刷新',
            callback: action => {
              location.href = '/order'
            }
          })
        }
      },
      async drop (id) {
        const {status,data:{code}} = await this.$axios.post('/order/delete',{id})
        if (status === 200 && code === 0){
          this.$alert('您已成功删除订单','删除成功',{
            confirmButtonText: '刷新',
            callback: action => {
              location.href = '/order'
            }
          })
        }
      }
    }
  }
</script>
