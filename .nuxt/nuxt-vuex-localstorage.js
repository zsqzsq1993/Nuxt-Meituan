import bindStorage from 'nuxt-vuex-localstorage/plugins/bindStorage'

export default (ctx) => {
  const options = {"sessionStorage":["product"]}
  bindStorage(ctx, options)
}
