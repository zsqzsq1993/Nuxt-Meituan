export default {
  dbs: 'mongodb://localhost:27017/meituan',
  redis: {
    get host() {
      return 'localhost'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '415692115@qq.com'
    },
    get pass() {
      return 'fjljvqrgwuilcaeb'
    },
    get port() {
      return 587
    }
  },
  get code() {
    return () => {
      return Math.random().toString(16).slice(2, 6).toUpperCase()
    }
  },
  get expire() {
    return () => {
      return new Date().getTime() + 60*60*1000
    }
  }
}
