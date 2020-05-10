import Router from 'koa-router'
import axios from 'axios'

const router = new Router({
  prefix: '/search'
})

router.get('/top',async (ctx) => {
  const {status,data:{top}} = await axios.get('http://cp-tools.cn/search/top',{
    params: {
      city: ctx.query.city,
      input: ctx.query.input
    }
  })
  ctx.body = {
    top: status===200
      ? top
      : []
  }
})

router.get('/hotPlace', async (ctx) => {
  const {status,data:{result}} = await axios.get('http://cp-tools.cn/search/hotPlace',{
    params: {
      city: ctx.query.city
    }
  })
  ctx.body = {
    hots: status == 200
      ? result
      : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const city = ctx.query.city || '北京'
  const keyword = ctx.query.keyword || '旅游'
  const {status,data:{count,pois}} = await axios.get('http://cp-tools.cn/search/resultsByKeywords',{
    params: {
      city,
      keyword
    }
  })
  ctx.body = {
    count: status === 200
      ? count
      : 0,
    pois: status === 200
      ? pois
      : []
  }
})

router.get('/products', async (ctx) => {
  const city = ctx.query.city || '长沙'
  const keyword = ctx.query.keyword || '岳麓书院'
  const {status,data:{product,more}} = await axios.get('http://cp-tools.cn/search/products',{
    params: {
      city,
      keyword
    }
  })
  if (status === 200){
    ctx.body = {
      product,
      more,
      login: ctx.isAuthenticated()
    }
  }else {
    ctx.body = {
      product: {},
      more: [],
      login: false
    }
  }
})

export default router
