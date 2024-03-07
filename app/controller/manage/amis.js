const xss = require("xss");
const _ = require("lodash");

const amisRule = (ctx) => {
  return {
    label: {
      type: "string",
      required: true,
      message: ctx.__("validate_error_field", [ctx.__("标题")]),
    },

    content: {
      type: "string",
      required: true,
      message: ctx.__("validate_error_field", [ctx.__("内容")]),
    },

    type: {
      type: "string",
      required: true,
      message: ctx.__("validate_error_field", [ctx.__("类型")]),
    },

    sender: {
      type: "string",
      required: true,
      message: ctx.__("validate_error_field", [ctx.__("创建者")]),
    },
  };
};

let AmisController = {
  async list(ctx) {
    try {
      let payload = ctx.query;
      let queryObj = {};

      let amisList = await ctx.service.amis.find(payload, {
        query: queryObj,
        attributes: ["label", "path", "icon", "schema", "id"],
      });

      ctx.helper.renderSuccess(ctx, {
        data: amisList,
      });
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err,
      });
    }
  },

  async create(ctx) {
    try {
      let fields = ctx.request.body || {};
      const formObj = {
        label: fields.label,

        path: fields.path,

        icon: fields.icon,
        schema: JSON.stringify(fields.schema),

        // sender: fields.sender || "dora",

        createTime: new Date(),
      };

      // ctx.validate(amisRule(ctx), formObj);

      const newItem = await ctx.service.amis.create(formObj);
      // console.log("🚀 ~ create ~ newItem:", newItem);

      ctx.helper.renderSuccess(ctx, { data: { id: newItem.id } });
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err,
      });
    }
  },

  async getOne(ctx) {
    try {
      let _id = ctx.query.id;

      let targetItem = await ctx.service.amis.item(ctx, {
        query: {
          _id: _id,
        },
        attributes: ["label", "path", "icon", "schema", "id"],
      });

      ctx.helper.renderSuccess(ctx, {
        data: targetItem,
      });
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err,
      });
    }
  },

  async update(ctx) {
    try {
      let fields = ctx.request.body || {};
      const formObj = {
        label: fields.label,

        path: fields.path,

        icon: fields.icon,

        schema: JSON.stringify(fields.schema),

        updateTime: new Date(),
      };

      // ctx.validate(amisRule(ctx), formObj);

      await ctx.service.amis.update(ctx, fields.id, formObj);

      ctx.helper.renderSuccess(ctx);
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err,
      });
    }
  },

  async removes(ctx) {
    try {
      let targetIds = ctx.query.ids;
      await ctx.service.amis.removes(ctx, targetIds);
      ctx.helper.renderSuccess(ctx);
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err,
      });
    }
  },
};

module.exports = AmisController;
