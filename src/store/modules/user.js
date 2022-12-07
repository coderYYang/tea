import { LOGIN_IN, INIT_USER } from '../mutations'

export default {
  state: {
    list: 111,
    // 是否登入
    isLogin: false,
    token: '',
    // 用户信息
    userInfo: {}
  },
  getters: {},
  // 同步修改
  mutations: {
    // 登入功后存储信息
    LOGIN_IN(state, user) {
      state.isLogin = true;
      state.token = user.token;
      state.userInfo = user;
      // 持久化存储
      localStorage.setItem('userInfo', JSON.stringify(user));
    },
    // 持久化存储
    INIT_USER(state) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        state.isLogin = true;
        state.token = userInfo.token;
        state.userInfo = userInfo;
      }
    },
    // 退出登录
    loginOut(state) {
      state.isLogin = false;
      state.token = '';
      state.userInfo = {};
      localStorage.removeItem('userInfo');
    }
  },
  // 异步修改
  actions: {}
}
