/*
 * @Author: yy
 * @Date: 2022-03-10 21:04:20
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2022-07-24 19:53:48
 * @Description:
 */
const path = require("path");
module.exports = {
  configureWebpack: (config) => {
    config.resolve = {
      extensions: [".js", ".json", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    };
  },
  publicPath: "./",
};
