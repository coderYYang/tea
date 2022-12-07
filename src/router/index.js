import Vue from "vue";
import VueRouter from "vue-router";
import { Toast } from "vant";
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/home/Home"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/list",
    name: "List",
    component: () => import("../views/List"),
    meta: {
      title: "分类",
    },
  },
  {
    path: "/cate",
    name: "Cate",
    component: () => import("../views/Cate"),
    meta: {
      title: "购物车",
    },
  },
  {
    path: "/my",
    name: "My",
    component: () => import("../views/My"),
    meta: {
      title: "我的",
    },
  },
  {
    path: "/address",
    name: "Address",
    component: () => import("../views/address/Address"),
    meta: {
      title: "地址管理",
    },
  },
  {
    path: "/editAddress",
    name: "EditAddress",
    component: () => import("../views/address/EditAddress"),
    meta: {
      title: "地址管理",
    },
  },
  {
    path: "/search",
    component: () => import("../views/search/Search"),
    children: [
      {
        path: "/",
        name: "SearchIndex",
        component: () => import("../views/search/SearchIndex"),
      },
      {
        path: "/searchList",
        name: "SearchList",
        component: () => import("../views/search/SearchList"),
      },
    ],
    meta: {
      title: "搜索",
    },
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("../views/detail/Detail"),
    meta: {
      keepAlive: true,
      title: "详情",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/login/Register"),
    meta: {
      title: "注册新用户",
    },
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order"),
    meta: {
      title: "提交订单",
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("../views/Payment"),
    meta: {
      title: "支付",
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const nextArr = ["/payment", "/cate", "/address", "/order", "/my"];
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (nextArr.indexOf(to.path) >= 0 && !userInfo) {
    Toast("请登入！");
    next("/login");
  }
  next();
});

export default router;
