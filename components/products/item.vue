<template>
  <dl class="s-item">
    <dt>
      <img :src="product.img" alt="product.name" />
    </dt>
    <dd>
      <h3>
        <nuxt-link :to="{
          path:'detail',
          query:{
            keyword:product.name,
            type:product.module,
            city:$store.getters['geo/city'].replace('市','')}}">
          {{product.name}}
        </nuxt-link>
      </h3>
      <el-rate v-model="product.rating"
               :colors="['#ff9900', '#ff9900', '#FF9900']"
               disabled />
      <span v-if="product.rating > 4"
            class="s-item-comment">很好</span>
      <span v-else-if="product.rating > 3"
            class="s-item-comment">一般</span>
      <span v-else
            class="s-item-comment">很差</span>
      <span class="s-item-value">{{product.rating}}分</span>
      <span class="s-item-comment-total"> {{product.comment}}人评论 </span>
      <p>
        <span class="s-item-type">{{product.type}}</span>
        <span class="s-item-addr">{{product.address}}</span>
      </p>
      <p>
        <em class="s-item-price">¥{{product.price}}起</em>
        <span>{{product.status}}</span>
      </p>
      <ul>
        <li v-if="product.tag && product.tag.length">
          <span class="detail-type">景酒</span>{{product.tag}}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
  export default {
    props: {
      product:{
        type: Object,
        default () {
          return {}
        }
      }
    },
  }
</script>
