exports.ids=[1],exports.modules={101:function(t,e,r){var content=r(114);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var c=r(5).default;t.exports.__inject__=function(t){c("1e978bd5",content,!0,t)}},113:function(t,e,r){"use strict";r.r(e);var c=r(101),n=r.n(c);for(var o in c)"default"!==o&&function(t){r.d(e,t,(function(){return c[t]}))}(o);e.default=n.a},114:function(t,e,r){(e=r(4)(!1)).push([t.i,".page-cart{margin:20px auto}.page-cart,.page-cart .m-cart .post,.page-cart .m-cart>p{width:980px}.page-cart .empty{background:#fff;padding:20px;text-align:center}.page-cart .m-cart{background:#f8f8f8;width:1190px;margin:0 auto;padding-top:10px}.page-cart .m-cart>section{width:950px}.page-cart .m-cart>p{text-align:right;font-size:12px;font-weight:bolder;color:#666;line-height:30px}.page-cart .m-cart>div.post{text-align:right}.page-cart .m-cart .money{font-size:20px;color:#f76120;font-style:normal}.page-cart div[role=dialog]{z-index:99999!important}.page-cart .v-modal{z-index:99995!important}.el-mail{width:980px}",""]),t.exports=e},141:function(t,e,r){"use strict";r.r(e);var c={props:{cartData:{type:Array,default:()=>[]}}},n=r(1),o={components:{list:Object(n.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-table",{staticStyle:{width:"980px"},attrs:{data:t.cartData}},[r("el-table-column",{attrs:{prop:"name",label:"项目",width:"532"}}),t._v(" "),r("el-table-column",{attrs:{prop:"price",label:"单价",width:"132"}}),t._v(" "),r("el-table-column",{attrs:{label:"数量",width:"212"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input-number",{attrs:{min:0},model:{value:e.row.count,callback:function(r){t.$set(e.row,"count",r)},expression:"scope.row.count"}})]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"总价"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{},[t._v("\n        "+t._s(e.row.count*e.row.price)+"\n      ")])]}}])})],1)}),[],!1,null,null,"3ef15e6d").exports},methods:{async submit(){const t=this,{status:e,data:data}=await this.$axios.post("/order/createOrder",{cartNo:t.cartNo,total:t.total,count:t.cart[0].count});200===e&&0===data.code&&await t.$alert("恭喜您，已成功下单，订单号为"+data.id,"下单成功",{confirmButtonText:"确定",callback:t=>{location.href="/order"}})}},computed:{total(){return this.cart[0].count*this.cart[0].price}},async asyncData(t){const e=t.query.id,{status:r,data:{data:{price:c,name:n},code:code}}=await t.$axios.post("/cart/getCart",{id:e});if(200==r&&0==code)return{cart:[{price:c,name:n,count:1}],cartNo:e}}};var l=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page-cart"},[r("el-row",[t.cart.length?r("el-col",{staticClass:"m-cart",attrs:{span:24}},[r("list",{attrs:{cartData:t.cart}}),t._v(" "),r("p",[t._v("\n        应付金额："),r("em",{staticClass:"money"},[t._v("¥"+t._s(t.total))])]),t._v(" "),r("div",{staticClass:"post"},[r("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("\n          提交订单\n        ")])],1)],1):r("el-col",{staticClass:"empty",attrs:{span:24}},[t._v("购物车为空")])],1)],1)}),[],!1,(function(t){var e=r(113);e.__inject__&&e.__inject__(t)}),null,"1525c844");e.default=l.exports}};