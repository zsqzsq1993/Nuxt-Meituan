const state = () => ({
  keyword: ''
})
// const getters = {
//   keyword () {
//
//   }
// }
const mutations = {
  setKeyword (state,keyword) {
    state.keyword = keyword
  }
}

const actions = {
  setKeyword: ({commit},keyword) => {
    commit('setKeyword',keyword)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
