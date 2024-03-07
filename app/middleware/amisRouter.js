const _ = require("lodash");
const amisAdminController = require("../controller/manage/amis");
const amisApiController = require("../controller/api/amis");

module.exports = (options, app) => {
  return async function amisRouter(ctx, next) {
    let pluginConfig = app.config.doraAmis;
    await app.initPluginRouter(
      ctx,
      pluginConfig,
      amisAdminController,
      amisApiController
    );
    await next();
  };
};
