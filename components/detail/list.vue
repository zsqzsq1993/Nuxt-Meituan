<template>
  <div class="m-detail-list">
    <ul>
      <li>{{more.length}}款套餐</li>
      <item v-for="(item,idx) in more"
            :key="idx"
            :meta="item"/>
    </ul>
  </div>
</template>

<script>
  import item from "./item"
  export default {
    components: {
      item
    },
    props: {
      more: {
        type: Array,
        default: ()=>{
          return []
        }
      }
    }
  }
</script>
