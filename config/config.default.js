"use strict";

/**
 * egg-dora-amis default config
 * @member Config#eggDoraAmis
 * @property {String} SOME_KEY - some description
 */

const pkgInfo = require("../package.json");
exports.doraAmis = {
  alias: "amis", // 插件目录，必须为英文
  pkgName: "egg-dora-amis", // 插件包名
  enName: "doraAmis", // 插件名
  name: "公告", // 插件名称
  description: "公告", // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
  version: pkgInfo.version, // 版本号
  iconName: "icon_service", // 主菜单图标名称
  adminUrl: "/amis/js/app.js",
  adminApi: [
    {
      url: "amis/getList",
      method: "get",
      controllerName: "list",
      details: "获取公告列表",
    },
    {
      url: "amis/getOne",
      method: "get",
      controllerName: "getOne",
      details: "获取单条公告信息",
    },
    {
      url: "amis/addOne",
      method: "post",
      controllerName: "create",
      details: "添加单个公告",
    },
    {
      url: "amis/updateOne",
      method: "post",
      controllerName: "update",
      details: "更新公告信息",
    },
    {
      url: "amis/delete",
      method: "get",
      controllerName: "removes",
      details: "删除公告",
    },
  ],
  fontApi: [
    {
      url: "amis/getList",
      method: "get",
      controllerName: "list",
      details: "获取公告列表",
    },
    {
      url: "amis/getOne",
      method: "get",
      controllerName: "getOne",
      details: "获取公告详情",
    },
  ],

  initData: "", // 初始化数据脚本
  pluginsConfig: ` 
    module.exports = {\n
        enable: true,\n
         \n
    };\n
    `, // 插入到 plugins.js 中的配置
  defaultConfig: `
    module.exports = {\n
        match: [ctx => ctx.path.startsWith('/manage/amis'), ctx => ctx.path.startsWith('/api/amis')],\n
    },\n
    `, // 插入到 config.default.js 中的配置
};
