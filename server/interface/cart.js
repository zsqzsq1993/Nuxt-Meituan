import Router from 'koa-router'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

const router = new Router({
  prefix: '/cart'
})

router.post('/createCart',async ctx => {
  if (!ctx.isAuthenticated()){
    ctx.body = {
      code: -1,
      message: '未登陆'
    }
  }
  const {id,detail} = ctx.request.body
  const time = Date()
  const cartNo = md5(Math.random()*1000 + time).toString()
  const newCart = Cart.create({
    id,
    detail,
    cartNo,
    time,
    user: ctx.session.passport.user
  })
  if (newCart){
    ctx.body = {
      code: 0,
      message: '成功创建购物车',
      cartNo
    }
  }else{
    ctx.body = {
      code: -1,
      message: '创建购物车失败'
    }
  }
})

router.post('/getCart',async ctx => {
  const {id} = ctx.request.body
  const cart = await Cart.findOne({cartNo: id})
  if (cart){
    ctx.body = {
      code: 0,
      data: cart.detail
    }
  }else{
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
