<template>
  <div class="page-login">
    <div class="login-header">
      <a class="logo" href="/" />
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网">
      </div>
      <div class="form">
        <h4 v-if="error" class="tips">{{error}}</h4>
        <p><span>账号登陆</span></p>
        <el-input type="text"
                  v-model="username"
                  prefix-icon="profile"/>
        <el-input type="password"
                  v-model="password"
                  prefix-icon="password"/>
        <br />
        <el-button class="btn-login"
                   type="success"
                   size="min"
                   @click="login">登陆</el-button>
      </div>
    </div>

  </div>
</template>
<script>
  import axios from 'axios'
  import CryptoJs from 'crypto-js'
  export default {
    layout: 'blank',
    data () {
      return{
        error: '',
        username: '',
        password: ''
      }
    },
    methods: {
      login: async function () {
        const self = this
        const result = await axios.post('/users/login',{
          username: window.encodeURIComponent(self.username),
          password: CryptoJs.MD5(self.password).toString()
        })
        if ( result.status === 200 ){
          if ( result.data && result.data.code === 0 ){
            location.href = '/'
          }else{
            this.error = result.data.message
          }
        }else{
          this.error = `服务器异常，错误码为${result.status}`
        }
        setTimeout(() => {
          self.error = ''
        },1500)
      }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/css/login/index.scss'
</style>
