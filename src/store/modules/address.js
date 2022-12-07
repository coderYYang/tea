import { GET_ADDRESS } from "../mutations"
export default {
  state: {
    addressList: []
  },
  mutations: {
    GET_ADDRESS(state, list) {
      state.addressList = list
    }
  },
}