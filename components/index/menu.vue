<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="leave">
      <dt>全部分类</dt>
      <dd
        v-for="(item,index) in menuOnline"
        :key="index"
        @mouseenter="enter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div class="detail"
         v-if="kind"
         @mouseenter="sover"
         @mouseleave="sout">
      <template v-for="(item,index) in currentdetail.child">
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="(v,idx) in item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        kind: '',
        menu:[{
          type: 'food',
          name: '美食',
          child: [{
            title: '美食',
            child: ['代金券','甜点饮品','火锅','自助餐','小吃快餐']
          }]
        },{
          type: 'takeout',
          name: '外卖',
          child: [{
            title: '外卖',
            child: ['美团外卖']
          }]
        },{
          type: 'hotel',
          name: '酒店',
          child: [{
            title: '酒店星级',
            child:['经济型','舒适/三星','高档/四星','豪华/五星']
          }]
        }],
        menuOnline: this.$store.state.home.menu
      }
    },
    methods: {
      enter: function (e) {
        this.kind = e.target.querySelector('i').className
      },
      leave: function () {
        const self = this
        this._timer = setTimeout(function () {
          self.kind = ''
        },30)
      },
      sover: function () {
        clearTimeout(this._timer)
      },
      sout: function () {
        this.kind = ''
      }
    },
    computed: {
      currentdetail: function () {
        return this.menuOnline.filter(item =>
          item.type === this.kind
        )[0]
      }
    }
  }
</script>
