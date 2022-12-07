import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user.js'
import cate from './modules/cate.js'
import address from './modules/address.js'
import order from './modules/order.js'


export default new Vuex.Store({
  modules: {
    user,
    cate,
    address,
    order
  }
})