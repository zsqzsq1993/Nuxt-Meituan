import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _51bbcd89 = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _24a09538 = () => interopDefault(import('../pages/changeCity.vue' /* webpackChunkName: "pages/changeCity" */))
const _5e06b9fa = () => interopDefault(import('../pages/detail.vue' /* webpackChunkName: "pages/detail" */))
const _5a5c46f2 = () => interopDefault(import('../pages/exit.vue' /* webpackChunkName: "pages/exit" */))
const _75318fd0 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _7756a596 = () => interopDefault(import('../pages/order.vue' /* webpackChunkName: "pages/order" */))
const _542e114d = () => interopDefault(import('../pages/products.vue' /* webpackChunkName: "pages/products" */))
const _9e4091e8 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _a8ec268e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _51bbcd89,
    name: "cart"
  }, {
    path: "/changeCity",
    component: _24a09538,
    name: "changeCity"
  }, {
    path: "/detail",
    component: _5e06b9fa,
    name: "detail"
  }, {
    path: "/exit",
    component: _5a5c46f2,
    name: "exit"
  }, {
    path: "/login",
    component: _75318fd0,
    name: "login"
  }, {
    path: "/order",
    component: _7756a596,
    name: "order"
  }, {
    path: "/products",
    component: _542e114d,
    name: "products"
  }, {
    path: "/register",
    component: _9e4091e8,
    name: "register"
  }, {
    path: "/",
    component: _a8ec268e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
