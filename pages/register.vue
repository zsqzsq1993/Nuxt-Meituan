<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登陆</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form ref="ruleform"
               :model="ruleform"
               :rules="rules"
               label-width="80px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleform.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleform.email"></el-input>
          <el-button size="small" round @click="sendMsg" :disabled="disabled">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleform.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleform.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleform.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="https://rules-center.meituan.com/rules-detail/4" target="_blank">《美团点评用户服务协议》</a>
          <a class="f1" href="https://rules-center.meituan.com/rules-detail/2" target="_blank">《美团点评隐私政策》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  import axios from 'axios'
  import CryptoJs from 'crypto-js'
  export default {
    layout: 'blank',
    components: {
      axios
    },
    data () {
      return {
        disabled: false,
        error: '',
        statusMsg: '',
        ruleform: {
          name: '',
          email: 'zsqzsq1993@yeah.net',
          code: '',
          pwd: '',
          cpwd: ''
        },
        rules: {
          name: [{
            required: true, type: 'string', message: '请输入昵称', trigger: 'blur'
          }],
          email: [{
            required: true, message: '请输入邮箱', trigger: 'blur'
          },{
            type: 'email', message: '请输入正确邮箱格式', trigger: 'blur'
          }],
          pwd: [{
            required: true, message: '请输入密码', trigger: 'blur'
          },{
            min: 6, message: '密码在至少6位字符', trigger: 'blur'
          }],
          cpwd: [{
            required: true, message: '请确认密码', trigger: 'blur'
          },{
            validator: (rule,value,callback) => {
              if (value === ''){
                callback(new Error('确认密码不能为空'))
              }else if(value !== this.ruleform.pwd){
                callback(new Error('两次密码输入不一致'))
              }else{
                callback()
              }
            }, trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      sendMsg: function () {
        let namePass
        let emailPass
        let self = this
        if (this.timerid){
          return false
        }
        this.statusMessage = ''
        this.$refs['ruleform'].validateField('name',(valid) => {
          namePass = valid
        })
        this.$refs['ruleform'].validateField('email',(valid) => {
          emailPass = valid
        })
        if(emailPass || namePass){
          return false
        }
        axios.post('/users/verify',{
          username: encodeURIComponent(self.ruleform.name),
          email: self.ruleform.email
        }).then(({ status, data }) => {
          if(status===200 && data && data.code===0){
            self.disabled = true
            let count = 60
            self.statusMsg = `验证码已发送，剩余${ count-- }秒`
            self.timerid = setInterval(() => {
              self.statusMsg = `验证码已发送，剩余${ count-- }秒`
              if(count === 0){
                clearInterval(self.timerid)
                self.statusMsg = ''
                self.timerid = null
                self.disabled = false
              }
            },1000)
          }else{
            this.statusMsg = data.msg
          }
        })
      },
      register: function () {
        const self = this
        this.$refs['ruleform'].validate((valid) => {
          if (valid){
            axios.post('/users/register',{
              username: encodeURIComponent(self.ruleform.name),
              password: CryptoJs.MD5(self.ruleform.pwd).toString(),
              email: self.ruleform.email,
              code: self.ruleform.code
            }).then(({status,data}) => {
              if (status === 200){
                if (data && data.code === 0 ){
                  self.error = data.message
                  location.href = '/login'
                }else{
                  self.error = data.message
                }
              }else{
                self.error = `服务器出错，错误码为${status}`
              }
              setTimeout(()=>{
                self.error = ''
              },1500)
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
