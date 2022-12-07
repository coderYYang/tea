const express = require("express");

const router = express.Router();
const db = require("../db/index");

// 导入生成 token 包
const jwt = require("jsonwebtoken");
// 导入全局配置文件
const config = require("../config");
// 导入 multer 中间件
// const multer = require('multer');
// // dest用来定义一下文件存储路径；可以是相对路径，如当前格式，就会在代码运行文件所在文件夹下生成一个image文件夹
// const uplaod = multer({ dest: 'image/' });
// 引入支付宝配置文件
const alipaySdk = require("../db/aiPay");
const AlipayFormData = require("alipay-sdk/lib/form").default;

const axios = require("axios");
// home 推荐数据
router.get("/indexList/0/data", (req, res) => {
  const sql = "select * from search_list;";
  db.query(sql, (err, results) => {
    if (err) return res.send(err.message);
    res.send({
      code: 0,
      data: {
        lyTab: [
          { id: 0, label: "推荐" },
          { id: 1, label: "大红袍" },
          { id: 2, label: "铁观音" },
          { id: 3, label: "绿茶" },
          { id: 4, label: "普洱" },
          { id: 5, label: "茶具" },
          { id: 6, label: "花茶" },
          { id: 7, label: "红茶" },
        ],
        data: [
          // swiper
          {
            id: 1,
            type: "swiperList",
            data: [
              {
                id: 1,
                imgUrl: "./images/swiper1.jpeg",
              },
              {
                id: 2,
                imgUrl: "./images/swiper2.jpeg",
              },
              {
                id: 3,
                imgUrl: "./images/swiper3.jpeg",
              },
            ],
          },
          // icons
          {
            id: 2,
            type: "iconsList",
            data: [
              {
                id: 1,
                title: "自饮茶",
                imgUrl: "./images/icons1.png",
              },
              {
                id: 2,
                title: "茶具",
                imgUrl: "./images/icons2.png",
              },
              {
                id: 3,
                title: "茶礼盒",
                imgUrl: "./images/icons3.png",
              },
              {
                id: 4,
                title: "领福利",
                imgUrl: "./images/icons4.png",
              },
              {
                id: 5,
                title: "官方验证",
                imgUrl: "./images/icons5.png",
              },
            ],
          },
          // 爆款推荐
          {
            id: 3,
            type: "recommendList",
            data: [
              {
                id: 1,
                name: "龙井1號铁罐250g",
                content: "鲜爽甘醇 口粮首选",
                price: 68,
                imgUrl: "./images/recommend.jpeg",
              },
              {
                id: 2,
                name: "龙井1號铁罐250g",
                content: "鲜爽甘醇 口粮首选",
                price: 68,
                imgUrl: "./images/recommend.jpeg",
              },
            ],
          },
          // 猜你喜欢
          {
            id: 4,
            type: "likeList",
            data: results,
          },
        ],
      },
    });
  });
});
// home 大红袍数据
router.get("/indexList/1/data", (req, res) => {
  res.send({
    code: 0,
    data: [
      // adList
      {
        id: 1,
        type: "adList",
        data: [
          {
            id: 1,
            imgUrl: "./images/dhp.jpeg",
          },
        ],
      },
      // 猜你喜欢
      {
        id: 2,
        type: "likeList",
        data: [
          {
            id: 1,
            imgUrl: "./images/like.jpeg",
            name: "安吉雨前珍稀白茶1号",
            price: 399,
          },
          {
            id: 2,
            imgUrl: "./images/like.jpeg",
            name: "安吉雨前珍稀白茶1号",
            price: 399,
          },
          {
            id: 3,
            imgUrl: "./images/like.jpeg",
            name: "安吉雨前珍稀白茶1号",
            price: 399,
          },
          {
            id: 4,
            imgUrl: "./images/like.jpeg",
            name: "安吉雨前珍稀白茶1号",
            price: 399,
          },
        ],
      },
    ],
  });
});
// home 铁观音数据
router.get("/indexList/2/data", (req, res) => {
  res.send({
    code: 0,
    data: [
      // adList
      {
        id: 1,
        type: "adList",
        data: [
          {
            id: 1,
            imgUrl: "./images/tgy.jpeg",
          },
        ],
      },
      // icons
      {
        id: 2,
        type: "iconsList",
        data: [
          {
            id: 1,
            title: "自饮茶",
            imgUrl: "./images/icons1.png",
          },
          {
            id: 2,
            title: "茶具",
            imgUrl: "./images/icons2.png",
          },
          {
            id: 3,
            title: "茶礼盒",
            imgUrl: "./images/icons3.png",
          },
          {
            id: 4,
            title: "领福利",
            imgUrl: "./images/icons4.png",
          },
          {
            id: 5,
            title: "官方验证",
            imgUrl: "./images/icons5.png",
          },
        ],
      },
      // 猜你喜欢
      {
        id: 3,
        type: "likeList",
        data: [
          {
            id: 1,
            imgUrl: "./images/like.jpeg",
            name: "安吉雨前珍稀白茶1号",
            price: 399,
          },
          {
            id: 2,
            imgUrl: "./images/like.jpeg",
            name: "安吉雨前珍稀白茶1号",
            price: 399,
          },
          {
            id: 3,
            imgUrl: "./images/like.jpeg",
            name: "安吉雨前珍稀白茶1号",
            price: 399,
          },
          {
            id: 4,
            imgUrl: "./images/like.jpeg",
            name: "安吉雨前珍稀白茶1号",
            price: 399,
          },
        ],
      },
    ],
  });
});
// 搜索数据
router.get("/goods/searchList", (req, res) => {
  // 前端给后端的数据
  let [name, orderName] = Object.keys(req.query);
  let [searchName, order] = Object.values(req.query);
  const sql = `select * from search_list where name like '%${searchName}%' order by ${orderName} ${order}`;
  db.query(sql, (err, results) => {
    if (err) res.send(err.message);
    res.send({
      code: 0,
      message: "商品查询成功!",
      data: results,
    });
  });
});
// 分类页面数据
router.get("/list", (req, res) => {
  res.send({
    code: 0,
    message: "获取分类页面数据成功",
    data: [
      // 一级
      {
        id: 0,
        title: "推荐",
        // 二级
        data: {
          id: 0,
          title: "推荐",
          // 三级
          list: [
            {
              id: 0,
              name: "铁观音",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "功夫茶具",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "茶具电器",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "紫砂壶",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "龙井",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "武夷岩茶",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "井冈山",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
      // 一级
      {
        id: 1,
        title: "绿茶",
        // 二级
        data: {
          id: 1,
          title: "绿茶",
          // 三级
          list: [
            {
              id: 0,
              name: "龙井",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "碧螺春",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "雀舌",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "安景白茶",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "刘安瓜片",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "武夷岩茶",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "紫砂壶",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
      // 一级
      {
        id: 2,
        title: "乌龙",
        // 二级
        data: {
          id: 2,
          title: "乌龙",
          // 三级
          list: [
            {
              id: 0,
              name: "龙井",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "碧螺春",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "雀舌",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "安景白茶",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "刘安瓜片",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "武夷岩茶",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "紫砂壶",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
      {
        id: 3,
        title: "红茶",
        // 二级
        data: {
          id: 3,
          title: "红茶",
          // 三级
          list: [
            {
              id: 0,
              name: "红茶1",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "红茶2",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "红茶3",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "红茶4",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "红茶5",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "红茶6",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "红茶7",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
      {
        id: 4,
        title: "白茶",
        // 二级
        data: {
          id: 4,
          title: "白茶",
          // 三级
          list: [
            {
              id: 0,
              name: "白茶1",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "白茶2",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "白茶3",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "白茶4",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "白茶5",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "白茶6",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "白茶7",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
      {
        id: 5,
        title: "普洱",
        // 二级
        data: {
          id: 5,
          title: "普洱",
          // 三级
          list: [
            {
              id: 0,
              name: "普洱1",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "普洱2",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "普洱3",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "普洱4",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "普洱5",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "普洱6",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "普洱7",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
      {
        id: 6,
        title: "花茶",
        // 二级
        data: {
          id: 6,
          title: "花茶",
          // 三级
          list: [
            {
              id: 0,
              name: "花茶1",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "花茶2",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "花茶3",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "花茶4",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "花茶5",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "花茶6",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "花茶7",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
      {
        id: 7,
        title: "茶具",
        // 二级
        data: {
          id: 7,
          title: "茶具",
          // 三级
          list: [
            {
              id: 0,
              name: "茶具1",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "茶具2",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "茶具3",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "茶具4",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "茶具5",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "茶具6",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "茶具7",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
      {
        id: 8,
        title: "手艺",
        // 二级
        data: {
          id: 8,
          title: "手艺",
          // 三级
          list: [
            {
              id: 0,
              name: "手艺1",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 1,
              name: "手艺2",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 2,
              name: "手艺3",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 3,
              name: "手艺4",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 4,
              name: "手艺5",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 5,
              name: "手艺6",
              imgUrl: "./images/list1.jpg",
            },
            {
              id: 6,
              name: "手艺7",
              imgUrl: "./images/list1.jpg",
            },
          ],
        },
      },
    ],
  });
});
// 根据 id 获取对应商品
router.get("/goodsDetail", (req, res) => {
  const sql = "select * from search_list where id = ?;";
  db.query(sql, req.query.id, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length !== 1)
      return res.send({ code: 0, message: "查询失败!" });
    res.send({
      code: 0,
      message: "查询成功",
      data: results[0],
    });
  });
});
// 登陆接口
router.post("/login", (req, res) => {
  // 拿到前端出传来的值
  let data = {
    username: req.body.username,
    password: req.body.password,
  };
  // 查询用户用户名
  const sqlPhone = "select * from login where username = ?;";
  db.query(sqlPhone, data.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length !== 1)
      return res.send({ code: 1, message: "用户名不存在，请注册!" });
    if (data.password != results[0].password)
      return res.send({ code: 1, message: "密码错误，请重新输入!" });
    const userInfo = { ...results[0], password: "" };
    // const token = jwt.sign(userInfo, config.jwtSecretKey, { expiresIn: config.expiresIn });
    // userInfo.token = token;
    // userInfo.token = 'Bearer ' + token;
    res.send({
      code: 0,
      message: "登录成功!",
      data: userInfo,
    });
  });
});
// 注册新用户
router.post("/register", (req, res) => {
  let pwd = req.body.pwd;
  let data = {
    username: req.body.username,
    password: req.body.password,
  };
  if (data.password != pwd) {
    res.send({
      code: 1,
      message: "两次密码不一致!",
    });
  }
  // 查询用户是否存在
  const sql = `select * from login where username = ?;`;
  db.query(sql, data.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length > 0)
      return res.send({ code: 1, message: "用户名已存在，请更换后再试!" });
    const token = jwt.sign(data, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    // 添加用户
    const addSql = "insert into login set ?";
    db.query(
      addSql,
      { username: data.username, password: data.password, token: token },
      (error, result) => {
        if (error) return res.send(error.message);
        if (result.affectedRows !== 1)
          return res.send({ code: 0, message: "注册失败!" });
        res.send({
          code: 0,
          message: "注册成功!",
        });
      }
    );
  });
});
// 获取用户信息
router.get("/userInfo", (req, res) => {
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  const userSql = `select * from login where username = ?;`;
  db.query(userSql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length === 0)
      return res.send({ code: 1, message: "用户信息不存在!" });
    let data = {
      username: results[0].username,
      avatar: results[0].avatar,
    };
    res.send({
      code: 0,
      message: "获取用户信息成功!",
      data: data,
    });
  });
});
// 添加到购物车
router.post("/addCate", (req, res) => {
  let goodsId = req.body.goodsId;
  // 获取 token 并解析
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  // 查询用户
  const sql = "select * from login where username = ?;";
  db.query(sql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    let uId = results[0].id;
    // 查询商品
    const sqlGoods = "select * from search_list where id = ?;";
    db.query(sqlGoods, goodsId, (error, result) => {
      if (error) return res.send(error.message);
      let goods = result[0];
      let goodsInfo = {
        uId: uId,
        goodsId: goodsId,
        goodsName: goods.name,
        goodsPrice: goods.price,
        goodsNum: 1,
        goodsImg: goods.imgUrl,
      };
      // 查询用户之前是否添加过该商品
      const searchSql = `select * from goods_cate where uId = ${uId} and goodsId = ${goodsId};`;
      db.query(searchSql, (err1, results1) => {
        if (err1) return res.send(err1.message);
        // 用户添加过商品到购物车
        if (results1.length === 1) {
          let { goodsNum } = results1[0];
          let { id } = results1[0];
          const changeNum = `update goods_cate set goodsNum = ${
            parseInt(goodsNum) + 1
          } where id = ${id};`;
          db.query(changeNum, (err2, results2) => {
            if (err2) return res.send(err2.message);
            if (results2.affectedRows !== 1)
              return res.send({ code: 1, message: "添加到购物车失败！" });
            res.send({
              code: 0,
              message: "添加到购物车成功！",
            });
          });
        } else {
          // 添加商品到数据库
          const addSql = "insert into goods_cate set ?";
          db.query(addSql, goodsInfo, (err3, results3) => {
            if (err3) return res.send(err3.message);
            if (results3.affectedRows !== 1)
              return res.send({ code: 1, message: "添加到购物车失败！" });
            res.send({
              code: 0,
              message: "添加到购物车成功！",
            });
          });
        }
      });
    });
  });
});
// 查询购物车数据
router.post("/searchCate", (req, res) => {
  // 获取 token 并解析
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  if (!userInfo.username) return res.send({ code: 1, message: "请登入" });
  const sql = "select * from login where username = ?;";
  db.query(sql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    let uId = results[0].id;
    // 查询 uId 购物车数据
    const uIdSql = "select * from goods_cate where uId = ?;";
    db.query(uIdSql, uId, (err1, results1) => {
      if (err1) return res.send(err1.message);
      res.send({
        code: 0,
        message: "获取购物车数据成功!",
        data: results1,
      });
    });
  });
});
// 删除商品
router.post("/deleteCate", (req, res) => {
  let goodsId = req.body.goodsId;
  let deleteIn = goodsId.join();
  const sql = `delete from goods_cate where id in (${deleteIn});`;
  db.query(sql, (err, results) => {
    if (err) return res.send(err.message);
    // if (results.affectedRows !== 1) return res.send({ code: 1, message: '删除失败！' })
    res.send({
      code: 0,
      message: "删除成功！",
    });
  });
});
// 修改商品数量
router.post("/numberChange", (req, res) => {
  let { id, number } = req.body;
  const sql = `select * from goods_cate where id = ${id};`;
  db.query(sql, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length !== 1)
      return res.send({ code: 1, message: "查询商品失败！" });
    let { goodsNum } = results[0];
    const upSql = `update goods_cate set goodsNum = ${number} where id = ${id}`;
    db.query(upSql, (err1, results1) => {
      if (err1) return res.send(err1.message);
      if (results1.affectedRows !== 1) return res.send("数量添加失败！");
      res.send({
        code: 0,
        message: "数量改变成功！",
      });
    });
  });
});
// 添加我的地址
router.post("/addAddress", (req, res) => {
  let content = req.body;
  // 获取 token 并解析
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  // 查询用户
  const userSql = `select * from login where username = ?;`;
  db.query(userSql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length !== 1)
      return res.send({ code: 1, message: "用户不存在！" });
    let { id } = results[0];
    content.uId = id;
    if (content.isDefault !== 1) {
      const addressSql = `insert into address set ?`;
      db.query(addressSql, content, (err1, results1) => {
        if (err1) return res.send(err1.message);
        if (results1.affectedRows !== 1)
          return res.send({ code: 1, message: "地址添加失败！" });
        res.send({
          code: 0,
          message: "地址添加成功！",
        });
      });
    } else {
      const sqlUser = `select * from address where uId = ${id} and isDefault = ${content.isDefault};`;
      db.query(sqlUser, (err2, results2) => {
        if (err2) return res.send(err2.message);
        if (results2.length > 0) {
          let addressId = results2[0].id;
          const changeId = `update address set isDefault = 0 where id = ${addressId};`;
          db.query(changeId, (err3, results3) => {
            if (err3) return res.send(err3.message);
            const addressSql = `insert into address set ?`;
            db.query(addressSql, content, (err4, results4) => {
              if (err4) return res.send(err4.message);
              if (results4.affectedRows !== 1)
                return res.send({ code: 1, message: "地址添加失败！" });
              res.send({
                code: 0,
                message: "地址添加成功！",
              });
            });
          });
        } else {
          const addressSql = `insert into address set ?`;
          db.query(addressSql, content, (err1, results1) => {
            if (err1) return res.send(err1.message);
            if (results1.affectedRows !== 1)
              return res.send({ code: 1, message: "地址添加失败！" });
            res.send({
              code: 0,
              message: "地址添加成功！",
            });
          });
        }
      });
    }
  });
});
// 查询收货地址
router.post("/searchAddress", (req, res) => {
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  // 查询用户
  const userSql = `select * from login where username = ?;`;
  db.query(userSql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length !== 1)
      return res.send({ code: 1, message: "用户不存在！" });
    let { id } = results[0];
    // 查询地址
    const searchSql = `select * from address where uId = ${id};`;
    db.query(searchSql, (err1, results1) => {
      if (err1) return res.send(err1.message);
      res.send({
        code: 0,
        message: "查询地址成功！",
        data: results1,
      });
    });
  });
});
// 修改收货地址
router.post("/updateAddress", (req, res) => {
  let content = req.body;
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  let [
    id,
    name,
    tel,
    province,
    city,
    county,
    addressDetail,
    isDefault,
    areaCode,
  ] = [
    content.id,
    content.name,
    content.tel,
    content.province,
    content.city,
    content.county,
    content.addressDetail,
    content.isDefault,
    content.areaCode,
  ];
  const userSql = `select * from login where username = ?`;
  db.query(userSql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length !== 1)
      return res.send({ code: 1, message: "用户不存在！" });
    let uId = results[0].id;
    if (content.isDefault !== 1) {
      const updateSql = `update address set name = ?, tel = ?, province = ?, city = ? , county = ?, addressDetail = ?,
      isDefault = ?, areaCode = ? where id = ${id}`;
      db.query(
        updateSql,
        [name, tel, province, city, county, addressDetail, isDefault, areaCode],
        (err1, results1) => {
          if (err1) return res.send(err1.message);
          if (results1.affectedRows !== 1)
            return res.send({ code: 1, message: "地址修改失败！" });
          res.send({
            code: 0,
            message: "地址修改成功！",
          });
        }
      );
    } else {
      const sqlUser = `select * from address where uId = ${uId} and isDefault = ${isDefault};`;
      db.query(sqlUser, (err2, results2) => {
        if (err2) return res.send(err2.message);
        if (results2.length > 0) {
          let addressId = results2[0].id;
          const changeId = `update address set isDefault = 0 where id = ${addressId};`;
          db.query(changeId, (err3, results3) => {
            if (err3) return res.send(err3.message);
            const updateSql = `update address set name = ?, tel = ?, province = ?, city = ? , county = ?, addressDetail = ?,
            isDefault = ?, areaCode = ? where id = ${id}`;
            db.query(
              updateSql,
              [
                name,
                tel,
                province,
                city,
                county,
                addressDetail,
                isDefault,
                areaCode,
              ],
              (err4, results4) => {
                if (err4) return res.send(err4.message);
                if (results4.affectedRows !== 1)
                  return res.send({ code: 1, message: "地址更新失败！" });
                res.send({
                  code: 0,
                  message: "地址更新成功！",
                });
              }
            );
          });
        } else {
          const updateSql = `update address set name = ?, tel = ?, province = ?, city = ? , county = ?, addressDetail = ?,
          isDefault = ?, areaCode = ? where id = ${id}`;
          db.query(
            updateSql,
            [
              name,
              tel,
              province,
              city,
              county,
              addressDetail,
              isDefault,
              areaCode,
            ],
            (err1, results1) => {
              if (err1) return res.send(err1.message);
              if (results1.affectedRows !== 1)
                return res.send({ code: 1, message: "地址修改失败！" });
              res.send({
                code: 0,
                message: "地址修改成功！",
              });
            }
          );
        }
      });
    }
  });
});
// 删除收货地址
router.post("/deleteAddress", (req, res) => {
  let id = req.body.id;
  const delSql = `delete from address where id = ${id};`;
  db.query(delSql, (err, results) => {
    if (err) return res.send(err.message);
    if (results.affectedRows !== 1)
      return res.send({ code: 1, message: "地址删除失败！" });
    res.send({
      code: 0,
      message: "地址删除成功！",
    });
  });
});
// 用户上传头像
router.post("/uploadAvatar", (req, res) => {
  let avatar = req.body.content;
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  const userSql = `select * from login where username = ?;`;
  db.query(userSql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length === 0)
      return res.send({ code: 1, message: "用户信息不存在!" });
    let { id } = results[0];
    const setSql = `update login set avatar = ? where id = ${id};`;
    db.query(setSql, avatar, (err1, results1) => {
      if (err1) return res.send(err1.message);
      if (results1.affectedRows !== 1)
        return res.send({ code: 1, message: "头像上传失败!" });
      res.send({
        code: 0,
        message: "头像上传成功!",
      });
    });
  });
});
// 获取用户下单购物车详情
router.get("/cateGoodsDetail", (req, res) => {
  let ids;
  if (Array.isArray(ids)) {
    ids = req.query.id.join();
  } else {
    ids = req.query.id;
  }
  const sql = `select * from goods_cate where id in (${ids});`;
  db.query(sql, (err, results) => {
    if (err) return res.send(err.message);
    res.send({
      code: 0,
      message: "查询成功",
      data: results,
    });
  });
});
// 生成订单
router.post("/generateOrder", (req, res) => {
  let goodsArr = req.body.goodsId;
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  // 订单号：时间戳 + 6位随机数
  function setTimeDate(data) {
    return data < 10 ? "0" + data : data;
  }
  function randomNum() {
    const data = new Date();
    let month = setTimeDate(data.getMonth() + 1);
    let day = setTimeDate(data.getDate());
    let hour = setTimeDate(data.getHours());
    let minute = setTimeDate(data.getMinutes());
    let second = setTimeDate(data.getSeconds());
    let time =
      data.getFullYear() +
      month +
      day +
      hour +
      minute +
      second +
      Math.round(Math.random() * 1000000);
    return time;
  }
  /* 
    未支付：1
    待支付：2
    支付成功：3
    支付失败： 4
  */
  let goodsName = [];
  let goodsPrice = 0;
  let goodsNum = 0;
  let orderId = randomNum();
  goodsArr.forEach((item) => {
    goodsName.push(item.goodsName);
    goodsPrice += Number(item.goodsPrice) * Number(item.goodsNum);
    goodsNum += Number(item.goodsNum);
  });
  // 查询用户信息
  const userSql = `select * from login where username = ?;`;
  db.query(userSql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length === 0)
      return res.send({ code: 1, message: "用户信息不存在!" });
    let { id } = results[0];
    const insertSql = `insert into goods_order (uId, orderId, goodsName, goodsPrice, goodsNum, goodsStatus) values (${id}, ${orderId}, '${goodsName}', '${goodsPrice}', ${goodsNum}, '1');`;
    db.query(insertSql, (err1, results1) => {
      if (err1) return res.send(err1.message);
      if (results1.affectedRows !== 1)
        return res.send({ code: 1, message: "订单生成失败!" });
      const searchOrderSql = `select * from goods_order where uId = ${id} and orderId = ${orderId};`;
      db.query(searchOrderSql, (err2, results2) => {
        if (err2) return res.send(err2.message);
        res.send({
          code: 0,
          data: results2[0].orderId,
        });
      });
    });
  });
});
// 查询一个订单
router.get("/searchOrder", (req, res) => {
  // 接收订单号
  const { orderId } = req.query;
  const searchOrderSql = `select * from goods_order where orderId = ${orderId};`;
  db.query(searchOrderSql, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length === 0)
      return res.send({ code: 1, message: "查询订单失败！" });
    res.send({
      code: 0,
      data: results[0],
    });
  });
});
// 修改订单状态
router.post("/changeOrderStatus", (req, res) => {
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  const { orderId, goodsId } = req.body;
  const userSql = `select * from login where username = ?;`;
  db.query(userSql, userInfo.username, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length === 0)
      return res.send({ code: 1, message: "用户信息不存在!" });
    let { id } = results[0];
    const searchOrderSql = `select * from goods_order where uId = ${id} and orderId = ${orderId};`;
    db.query(searchOrderSql, (err1, results1) => {
      if (err1) return res.send(err1.message);
      if (results1.length === 0)
        return res.send({ code: 1, message: "查询订单失败！" });
      const chooseId = results1[0].id;
      // 改变订单状态
      const chooseOrderStatus = `update goods_order set goodsStatus = 2 where id = ${chooseId}`;
      db.query(chooseOrderStatus, (err2, results2) => {
        if (err2) return res.send(err2.message);
        if (results2.affectedRows !== 1)
          res.send({ code: 1, message: "订单状态更新失败！" });
        // 删除商品
        const goodsIdStr = goodsId;
        const sql = `delete from goods_cate where id in (${goodsIdStr});`;
        db.query(sql, (err3, results3) => {
          if (err3) return res.send(err3.message);
          res.send({
            code: 0,
            message: "订单提交成功！",
          });
        });
      });
    });
  });
});
// 支付订单
router.post("/payOrder", (req, res) => {
  const { orderId, name, price } = req.body;
  // 开始对接支付宝 api
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod("get");
  // 支付时信息
  formData.addField("bizContent", {
    // 订单号
    outTradeNo: orderId,
    // 写死的
    productCode: "FAST_INSTANT_TRADE_PAY",
    // 价格
    totalAmount: price,
    // 名字
    subject: name,
  });
  // 支付成功或失败跳转的链接
  formData.addField("returnUrl", "http://localhost:8080/#/payment");
  // formData.addField("returnUrl", "http://supernew.xyz:82/payment");
  // 返回 promise
  const result = alipaySdk.exec(
    "alipay.trade.page.pay",
    {},
    { formData: formData }
  );
  // 对接成功
  result.then((resp) => {
    res.send({
      code: 0,
      message: "支付中！",
      data: resp,
    });
  });
});
// 判断支付状态
router.post("/orderStatus", (req, res) => {
  let token = req.headers.token;
  let userInfo = jwt.decode(token);
  const { out_trade_no, trade_no } = req.body;
  // 开始对接支付宝 api
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod("get");
  // 支付时信息
  formData.addField("bizContent", {
    out_trade_no,
    trade_no,
  });
  const result = alipaySdk.exec(
    "alipay.trade.query",
    {},
    { formData: formData }
  );
  // 请求支付宝
  result.then((url) => {
    axios({
      url,
    })
      .then((resData) => {
        const data = resData.data.alipay_trade_query_response;
        if (data.code === "10000") {
          let message = "";
          let code = void 0;
          if (data.trade_status === "WAIT_BUYER_PAY") {
            res.send({
              code: 1,
              message: "支付宝有交易记录，没付款",
            });
          } else if (data.trade_status === "TRADE_FINISHED") {
            const userSql = `select * from login where username = ?;`;
            db.query(userSql, userInfo.username, (err, results) => {
              if (err) return res.send(err.message);
              if (results.length === 0)
                return res.send({ code: 1, message: "用户信息不存在!" });
              const { id } = results[0];
              const searchOrder = `select * from goods_order where uId = ${id} and orderId = ${out_trade_no}`;
              db.query(searchOrder, (err1, results1) => {
                if (err) return res.send({ code: 1, message: err.message });
                if (!results1.length)
                  return res.send({ code: 1, message: "订单查询失败" });
                const orderId = results1[0].id;
                const setOrderId = `update goods_order set goodsStatus = 3 where id = ${orderId}`;
                db.query(setOrderId, (err2, results2) => {
                  if (err) return res.send({ code: 1, message: err.message });
                  if (results2.affectedRows !== 1)
                    return res.send({ code: 1, message: "订单状态更新失败" });
                  res.send({
                    code: 2,
                    message: "交易完成，不可退款",
                  });
                });
              });
            });
          } else {
            const userSql = `select * from login where username = ?;`;
            db.query(userSql, userInfo.username, (err, results) => {
              if (err) return res.send(err.message);
              if (results.length === 0)
                return res.send({ code: 1, message: "用户信息不存在!" });
              const { id } = results[0];
              const searchOrder = `select * from goods_order where uId = ${id} and orderId = ${out_trade_no}`;
              db.query(searchOrder, (err1, results1) => {
                if (err) return res.send({ code: 1, message: err.message });
                if (!results1.length)
                  return res.send({ code: 1, message: "订单查询失败" });
                const orderId = results1[0].id;
                const setOrderId = `update goods_order set goodsStatus = 3 where id = ${orderId}`;
                db.query(setOrderId, (err2, results2) => {
                  if (err) return res.send({ code: 1, message: err.message });
                  if (results2.affectedRows !== 1)
                    return res.send({ code: 1, message: "订单状态更新失败" });
                  res.send({
                    code: 3,
                    message: "交易完成",
                  });
                });
              });
            });
          }
        } else if (data.code === "40004") {
          res.send({
            code: 4,
            message: "交易不存在",
          });
        } else {
          res.send({
            code: 4,
            message: data.msg,
          });
          throw new Error(data.msg);
        }
        // res.send({
        //   code: 0,
        //   message: "获取订单状态成功！",
        //   data: resData,
        // });
      })
      .catch((err) => {
        res.send({
          code: 500,
          message: "交易失败",
          data: err,
        });
      });
  });
});

module.exports = router;
