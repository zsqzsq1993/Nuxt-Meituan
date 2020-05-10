export default {
  actions: {
    async nuxtServerInit ({commit},{req,app}) {
      // if(app.store.state.geo.position.city===''){
      //   const {status,data:{city,province}} = await app.$axios.get('http://cp-tools.cn/geo/getPosition')
      //   commit('geo/setPosition',status===200?{province,city}:{
      //     province: '湖南省',
      //     city: '长沙市'
      //   })
      // }

      const {status:status2,data:{menu}} = await app.$axios.get('/geo/getMenuOffline')
      commit('home/setMenu',status2 === 200?menu:[])

      // const {status:status3,data:{hots}} = await app.$axios.get(`/search/hotPlace`,{
      //   params: {
      //     city: app.store.state.geo.position.city.replace('市','')
      //   }
      // })
      // commit('home/setHots',status3===200?hots:[])
    }
  }
}

