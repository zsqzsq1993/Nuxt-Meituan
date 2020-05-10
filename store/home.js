const state = () => ({
  menu: [],
  hots: []
})

const mutations = {
  setMenu (state,menu) {
    state.menu = menu
  },
  setHots (state,hots) {
    state.hots = hots
  }
}

const actions = {
  setMenu: ({commit}, menu) => {
    commit('setMenu', menu)
  },
  setHots: ({commit}, hots) => {
    commit('setHots', hots)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
