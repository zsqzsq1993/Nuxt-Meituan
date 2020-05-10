import Router from 'koa-router'
import axios from './utils/axios'
const router = new Router({
  prefix: '/category'
})
router.get('/crumbs', async (ctx) => {
  const city = ctx.query.city
  const {status,data:{areas,types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
    params: {
      city
    }
  })
  ctx.body = {
    areas,
    types
  }
})
export default router
