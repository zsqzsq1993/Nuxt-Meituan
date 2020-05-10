import config from '../dbs/config'
import Users from '../dbs/models/users'
import Redis from 'koa-redis'
import axios from './utils/axios'
import Router from 'koa-router'
import Passport from './utils/passport'
import nodeMailer from 'nodemailer'
const router = new Router({
  prefix: '/users'
})
const Store = new Redis().client

router.post('/register',async function (ctx,next) {
  const {username, password, code, email} = ctx.request.body
  const savedCode =  await Store.hget(`nodemail:${username}`,'code')
  const savedExpire = await Store.hget(`nodemail:${username}`,'expire')

  if (code){
    if (code !== savedCode){
      ctx.body = {
        code: -1,
        message: '验证码不正确（请注意大小写）'
      }
      return false
    }
    if (new Date().getTime() - savedExpire > 0){
      ctx.body = {
        code: -1,
        message: '您的验证码已过期'
      }
      return false
    }
  }else{
    ctx.body = {
      code: -1,
      message: '请填写验证妈'
    }
    return false
  }

  const results = await Users.find({username})
  if (results.length){
    ctx.body = {
      code: -1,
      message: '用户名已存在'
    }
    return false
  }
  const newuser = await Users.create({
    username,
    password,
    email,
  })
  if (newuser){
    const res = await axios.post('/users/login',{username,password})
    if (res.data && res.data.code === 0){
      ctx.body = {
        code: 0,
        message: '注册成功',
        user: res.data.user
      }
    }else{
      ctx.body = {
        code: -1,
        message: res.data.message
      }
    }
  }else{
    ctx.body = {
      code: -1,
      message: '注册失败'
    }
  }
})

router.post('/login',async (ctx,next) => {
  return Passport.authenticate('local',(err,user,info,status) => {
    if (err){
      ctx.body = {
        code: -1,
        message: err
      }
    }else{
      if (user){
        ctx.body = {
          code: 0,
          message: '登陆成功',
          user
        }
        return ctx.login(user)
      }else{
        ctx.body = {
          code: -1,
          message: info
        }
      }
    }
  })(ctx,next)
})

router.post('/verify',async (ctx,next) => {
  const username = ctx.request.body.username
  const savedExpire = Store.hget(`nodemail:${username}`,'expire')
  if (savedExpire && (new Date().getTime() - savedExpire) < 0){
    ctx.body = {
      code: -1,
      message: '验证请求过于频繁，请隔1分钟后再试'
    }
    return false
  }else{
    const deliver = nodeMailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    })
    const codeInfo = {
      code: config.code(),
      expire: config.expire()
    }
    const message = {
      from: config.smtp.user,
      to: ctx.request.body.email,
      subject: `来自Dolly站点的注册验证码`,
      html: `您的验证码是：${codeInfo.code}`
    }
    await deliver.sendMail(message, (err, info) => {
      if (err){
        return console.log(err)
      } else {
        Store.hmset(`nodemail:${username}`,'code',codeInfo.code,'expire',codeInfo.expire)
      }
    })
    ctx.body = {
      code: 0,
      message: '已成功发送验证码,可能会有延时，有效期1分钟'
    }
  }
})

router.get('/exit', (ctx,next) => {
  ctx.logout()
  if (!ctx.isAuthenticated()){
    ctx.body = {
      code: 0
    }
  }else{
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx,next) => {
  if(ctx.isAuthenticated()){
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  }else{
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router


