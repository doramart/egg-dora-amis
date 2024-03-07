const xss = require("xss");
const _ = require("lodash");

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
};

module.exports = AmisController;
