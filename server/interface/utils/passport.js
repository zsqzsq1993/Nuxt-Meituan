import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import Users from '../../dbs/models/users'

passport.use(new LocalStrategy(async (username,password, done) => {
  const result = await Users.findOne({username:username})
  if (result === null){
    return done(null,false,'用户名不存在')
  }else{
    if (result.password !== password){
      return done(null,false,'密码错误')
    }else{
      return done(null,result)
    }
  }
}))

passport.serializeUser((user,done) => {
  done(null,user)
})

passport.deserializeUser((user,done) => {
  return done(null,user)
})

export default passport
