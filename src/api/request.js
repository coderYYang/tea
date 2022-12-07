/*
 * @Author: yy
 * @Date: 2022-03-19 11:15:10
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2022-08-03 21:22:07
 * @Description: 封装 axios
 */
import axios from "axios";
import { Toast } from "vant";
import store from "../store";
import router from "../router";
const request = axios.create({
  // baseURL: "http://124.222.88.83:31/api",
  baseURL: "http://127.0.0.1:3000/api",
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    // 判断是否是登入状态
    if (config.headers.token) {
      config.headers.token = store.state.user.token;
      if (!config.headers.token) {
        router.push("/login");
        Toast("请登入！");
      }
    }
    // Toast.loading({
    //   message: "加载中...",
    //   forbidClick: true,
    // });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    // Toast.clear({ clearAll: true });
    return Promise.reject(error);
  }
);

export default request;
