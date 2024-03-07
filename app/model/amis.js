module.exports = (app) => {
  const mongoose = app.mongoose;
  var shortid = require("shortid");
  var path = require("path");
  var Schema = mongoose.Schema;
  var moment = require("moment");

  var AmisSchema = new Schema({
    _id: {
      type: String,
      default: shortid.generate,
    },
    createTime: {
      type: Date,
    },
    updateTime: {
      type: Date,
    },
    title: String, // 标题
    label: String, // 标题
    path: String, // 标题
    icon: String, // 标题
    schema: String, // 标题
    content: String, // 内容
    type: String, // 类型
    sender: String, // 创建者
  });

  AmisSchema.set("toJSON", {
    getters: true,
    virtuals: true,
  });
  AmisSchema.set("toObject", {
    getters: true,
    virtuals: true,
  });

  AmisSchema.path("createTime").get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
  });
  AmisSchema.path("updateTime").get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
  });

  return mongoose.model("amis", AmisSchema, "amis");
};
