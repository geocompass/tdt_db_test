"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "hi, egg";
  }
  async getPG() {
    let type = this.ctx.params.type ? parseInt(this.ctx.params.type) : 1;
    let from = this.ctx.query.from;
    let count = this.ctx.query.count;
    let result = await this.service.hello.getPG({
      type,
      from,
      count
    });
    this.ctx.body = result;
  }
  async addPG() {
    let type = this.ctx.params.type ? parseInt(this.ctx.params.type) : 1;
    let result = await this.service.hello.addPG({
      type
    });
    this.ctx.body = result;
  }
  async addPGMany() {
    let type = this.ctx.params.type ? parseInt(this.ctx.params.type) : 1;
    let count = this.ctx.query.count ? parseInt(this.ctx.query.count) : 10;
    let result = await this.service.hello.addPGMany({
      type,
      count
    });
    this.ctx.body = result;
  }
  async getMG() {
    let x = parseInt(this.ctx.query.x) ? parseInt(this.ctx.query.x) : 1;
    let result = await this.service.hello.getMG({
      x
    });
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