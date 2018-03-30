"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/getPG", controller.home.getPG);
  router.get("/getMG", controller.home.getMG);
  router.get("/addMG/:type", controller.home.addMG);
  router.get("/addMGMany/:type/:count", controller.home.addMGMany);
};
