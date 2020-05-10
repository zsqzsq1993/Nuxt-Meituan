import Cart from '../dbs/models/cart';
import Order from '../dbs/models/order';
import Router from 'koa-router';
import md5 from 'crypto-js/md5';

const router = new Router({
  prefix: '/order'
})

router.post('/createOrder',async ctx => {
  if (!ctx.isAuthenticated()){
    ctx.body = {
      code: -1,
      message: 'please login'
    }
  }
  const {cartNo,total,count} = ctx.request.body
  const cart = await Cart.findOne({cartNo})
  const time = Date()
  const id = md5(Math.random()*1000 + time).toString()
  const result = await Order.create({
    id,
    name: cart.detail.name,
    price: cart.detail.price,
    total,
    user: cart.user,
    imgs: cart.detail.imgs,
    status: 0,
    count
  })
  if (result){
    cart.remove()
    ctx.body = {
      code: 0,
      message: 'success',
      id
    }
  }else{
    ctx.body = {
      code: -1,
      message: 'saved failed.'
    }
  }

})

router.post('/getOrder',async ctx => {
  if (!ctx.isAuthenticated()){
    ctx.body = {
      code: -1,
      message: 'please login'
    }
  }
  const results = await Order.find({user:ctx.session.passport.user})
  if (!results){
    ctx.body = {
      code: -1,
      message: 'cannot find orders'
    }
  }else{
    ctx.body = {
      code: 0,
      list: results
    }
  }
})

router.post('/changeStatus', async ctx => {
  const {id} = ctx.request.body
  const result = await Order.findOneAndUpdate({id},{
    status:1
  })
  ctx.body = {
    code: result? 0: -1
  }
})

router.post('/delete', async ctx => {
  const {id} = ctx.request.body
  const result = await Order.findOneAndRemove({id})
  ctx.body = {
    code: result? 0: -1
  }
})

export default router
