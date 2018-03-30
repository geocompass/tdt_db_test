"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "hi, egg";
  }
  async getPG() {
    let result = await this.service.hello.getPG();
    this.ctx.body = result;
  }
  async getMG() {
    let result = await this.service.hello.getMG();
    this.ctx.body = result;
  }
  async addMG() {
    let type = this.ctx.params.type ? parseInt(this.ctx.params.type) : 1;
    let result = await this.service.hello.addMG(type);
    this.ctx.body = result;
  }
  async addMGMany() {
    let type = this.ctx.params.type ? parseInt(this.ctx.params.type) : 1;
    let count = this.ctx.params.count ? parseInt(this.ctx.params.count) : 100;
    let result = await this.service.hello.addMGMany(type, count);
    this.ctx.body = result;
  }
}

module.exports = HomeController;
