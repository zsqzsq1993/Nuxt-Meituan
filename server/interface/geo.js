import Router from 'koa-router'
import axios from 'axios'
import Menu from '../dbs/models/menu'
import Province from '../dbs/models/province'
import City from '../dbs/models/city'

const router = new Router({
  prefix: '/geo'
})
// Menu
router.get('/parseMenu', async (ctx) => {
  const {status,data:{menu}} = await axios.get('http://cp-tools.cn/geo/menu')
  if (status === 200){
    const result = await Menu.create({menu})
    if (result) {
      ctx.body = {
        code: 0,
        message: 'success'
      }
    }else{
      ctx.body = {
        code: -1,
        message: 'unsuccess'
      }
    }
  }
})

router.get('/getMenuOnline', async (ctx) => {
  const {status,data:{menu}} = await axios.get('http://cp-tools.cn/geo/menu')
  if (status === 200){
    ctx.body = {
      menu
    }
  }else{
    ctx.body = {
      menu: []
    }
  }
})

router.get('/getMenuOffline', async (ctx) => {
  const result = await Menu.findOne()
  ctx.body = {
    menu: result.menu
  }
})
// Position
router.get('/getPosition', async (ctx) => {
  const {status,data:{province,city}} = await axios.get('http://cp-tools.cn/geo/getPosition')
  if (status === 200){
    ctx.body = {
      province,
      city
    }
  }else{
    ctx.body = {
      province: '',
      city: ''
    }
  }
})
//Province
router.get('/parseProvince', async (ctx) => {
  const {status,data:{province}} = await axios.get('http://cp-tools.cn/geo/province')
  if (status === 200){
    await province.forEach((item) => {
      Province.create({
        id: item.id,
        name: item.name
      })
    })
    ctx.body = {
      message: 'finished'
    }
  }
})

router.get('/province', async (ctx) => {
  const province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.name
      }
    })
  }
})
//City
router.get('/parseCity',async (ctx) => {
  const {status,data:{city}} = await axios.get('http://cp-tools.cn/geo/city')
  if (status === 200){
    city.forEach((item) => {
      City.create({
        id: item.id,
        name: item.name,
        province: item.province
      })
    })
    ctx.body = {
      message: 'finished'
    }
  }
})

router.get('/city', async (ctx) => {
  const city = await City.find()
  if (city){
    ctx.body = {
      city: city.map(item => {
        return {
          id: item.id,
          name: item.name,
          province: item.province
        }
      })
    }
  }else{
    ctx.body = {
      city: []
    }
  }
})
// Get all cities under province ID
router.get('/province/:id', async (ctx) => {
  const province = await Province.findOne({id:ctx.params.id})
  if (province){
    const cities = await City.find({province:province.name})
    if (cities){
      ctx.body = {
        city: cities.map(item => {
          return {
            id: item.id,
            name: item.name,
            province: item.province
          }
        })
      }
    }else{
      ctx.body = {
        message: 'No cities under this province'
      }
    }
  }else{
    ctx.body = {
      message: 'Province ID incorrect'
    }
  }
})

router.get('/provinceOnline/:id',async (ctx) => {
  const {status,data:{city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  if (status === 200){
    ctx.body = {
      city
    }
  }else{
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async (ctx) => {
  const list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]
  const city = await City.find()
  const hots = city.filter((item) => {
    if (list.includes(item.name)){
      return true
    }else{
      return false
    }
  })
  ctx.body = {
    hots: hots.map(item => {
      return {
        id: item.id,
        name: item.name,
        province: item.province
      }
    })
  }
})


export default router
