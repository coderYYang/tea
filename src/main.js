import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "swiper/css/swiper.css";

// 引入全局 css
import "./assets/css/common.css";
// 字体图标引入
import "./assets/css/iconfont.css";

// 引入 ly-tab 插件
import LyTab from "ly-tab";
Vue.use(LyTab);

import "vant/lib/index.css";
import {
  Toast,
  Dialog,
  Lazyload,
  Checkbox,
  Stepper,
  Notify,
  AddressEdit,
  Uploader,
  Popover,
  Button,
} from "vant";
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Lazyload);
Vue.use(Checkbox);
Vue.use(Stepper);
Vue.use(AddressEdit);
Vue.use(Uploader);
Vue.use(Popover);
Vue.use(Button);

Vue.prototype.$success = (message) => {
  Notify({
    type: "success",
    message,
  });
};

Vue.prototype.$error = (message) => {
  Notify({
    type: "danger",
    message,
  });
};

Vue.prototype.$warn = (message) => {
  Notify({
    type: "warning",
    message,
  });
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
