import sessionStorage from 'sessionstorage'

const getters = {
  city () {
    return sessionStorage.getItem('city') ? sessionStorage.getItem('city') : '长沙市'
  },
  province () {
    return sessionStorage.getItem('province') ? sessionStorage.getItem('province') : '湖南省'
  }
}

const mutations = {
  setCity (state,city) {
    // state.city = city
    sessionStorage.setItem('city',city)
  },
  setProvince (state,province) {
    // state.province = province
    sessionStorage.setItem('province',province)
  }
}

const actions = {
  setCity: ({commit},city) => {
    commit('setCity',city)
  },
  setProvince: ({commit},province) => {
    commit('setProvince',province)
  }
}

export default {
  namespaced: true,
  //state,
  mutations,
  actions,
  getters
}
