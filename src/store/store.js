
const state = {
  awardCount: 0,
  reportCount: 0,
  usersCount: 0
}
const mutations = {
  SET_AWARD (state, payload) {
    state.awardCount = payload
  },
  SET_REPORT (state, payload) {
    state.reportCount = payload
  },
  SET_USERS (state, payload){
    state.usersCount = payload
  }
  
  
}
const actions = {

  // incrementAward: ({ commit }, amount) => commit('INCREMENT', amount),
  // decrementAward: ({ commit }, amount) => commit('INCREMENT', amount),
}
const getters = {
  award: state => state.awardCount,
  report: state => state.reportCount,
  users: state => state.usersCount
}
export default {
  state,
  getters,
  mutations,
  actions
}