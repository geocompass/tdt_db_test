"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get("/", controller.home.index);
  router.get("/getPG/:type", controller.home.getPG);
  router.get("/addPG/:type", controller.home.addPG);
  router.get("/addManyPG/:type", controller.home.addManyPG);
  router.get("/getMG", controller.home.getMG);
  router.get("/addMG/:type", controller.home.addMG);
  router.get("/addMGMany/:type/:count", controller.home.addMGMany);
};