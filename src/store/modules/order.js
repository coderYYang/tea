import { INIT_ORDER } from '../mutations'
export default {
  state: {
    orderId: ''
  },
  mutations: {
    INIT_ORDER(state, orderId) {
      state.orderId = orderId
    }
  }
}