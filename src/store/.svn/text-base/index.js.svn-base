import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  unfinishOrderNumber: '0',
  direction: 'forward'
}
export default new Vuex.Store({
  state,
  mutations: {
    updateLoding (state, status) {
      state.isLoading = status
    },
    updateDirection (state, direction) {
      state.direction = direction.direction
    },
    updateUnfinishOrderNumber (state, orderNumber) {
      state.unfinishOrderNumber = orderNumber
    }
  }
})
