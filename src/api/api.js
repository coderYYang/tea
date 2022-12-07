import request from "./request";

// home 推荐数据
export function HomeRecommend() {
  return request({
    method: "get",
    url: "/indexList/0/data",
  });
}

// home 所有数据
export function HomeAll(index) {
  return request({
    method: "get",
    url: "/indexList/" + index + "/data",
  });
}

// 获取 search搜索 数据
export function SearchData(params) {
  return request({
    method: "get",
    url: "/goods/searchList",
    params: params,
  });
}

// 获取分类数据
export function List() {
  return request({
    method: "get",
    url: "/list",
  });
}

// 登录
export function Login(data) {
  return request({
    method: "post",
    url: "/login",
    data: data,
  });
}

// 注册
export function Register(data) {
  return request({
    method: "post",
    url: "/register",
    data: data,
  });
}

// 添加到购物车
export function AddCate(data) {
  return request({
    method: "post",
    url: "/addCate",
    data: data,
    headers: {
      token: true,
    },
  });
}

// 获取商品详情
export function GoodsDetail(id) {
  return request({
    method: "get",
    url: `/goodsDetail?id=${id}`,
  });
}

// 查询购物车详情
export function SearchCate(data) {
  return request({
    method: "post",
    url: "/searchCate",
    data: data,
    headers: {
      token: true,
    },
  });
}

// 删除购物车商品
export function DeletedCart(data) {
  return request({
    method: "post",
    url: "/deleteCate",
    data: data,
  });
}

// 修改商品数量
export const NumbreChange = (data) => {
  return request({
    method: "post",
    url: "/numberChange",
    data: data,
    headers: {
      token: true,
    },
  });
};

// 新增地址
export const AddAddress = (data) => {
  return request({
    method: "post",
    url: "/addAddress",
    data,
    headers: {
      token: true,
    },
  });
};

// 获取用户地址
export const SearchAddress = () => {
  return request({
    method: "post",
    url: "/searchAddress",
    headers: {
      token: true,
    },
  });
};

// 修改收货地址
export const UpdateAddress = (data) => {
  return request({
    method: "post",
    url: "/updateAddress",
    data,
    headers: {
      token: true,
    },
  });
};

// 删除收货地址
export const DeleteAddress = (data) => {
  return request({
    method: "post",
    url: "/deleteAddress",
    data,
  });
};

// 用户上传头像
export const UploadAvatar = (data) => {
  return request({
    method: "post",
    url: "/uploadAvatar",
    data,
    headers: {
      token: true,
    },
  });
};

// 获取用户信息
export const UserInfo = () => {
  return request({
    url: "/userInfo",
    headers: {
      token: true,
    },
  });
};

// 生成订单ID
export const GenerateOrder = (data) => {
  return request({
    method: "post",
    url: "/generateOrder",
    data,
    headers: {
      token: true,
    },
  });
};
// 获取用户下单购物车详情
export const CateGoodsDetail = (params) => {
  return request({
    method: "get",
    url: "/cateGoodsDetail",
    params,
  });
};

// 查询订单
export const SearchOrder = (orderId) => {
  return request({
    url: `/searchOrder?orderId=${orderId}`,
  });
};

// 修改订单状态
export const ChangeOrderStatus = (data) => {
  return request({
    method: "post",
    url: "/changeOrderStatus",
    headers: {
      token: true,
    },
    data,
  });
};

// 支付订单
export const PayOrder = (data) => {
  return request({
    method: "post",
    url: "/payOrder",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  });
};

// 订单状态
export const OrderStatus = (data) => {
  return request({
    method: "post",
    url: "/orderStatus",
    headers: {
      token: true,
    },
    data,
  });
};
