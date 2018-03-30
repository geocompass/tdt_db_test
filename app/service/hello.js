const Service = require("egg").Service;
const Sequelize = require("sequelize");

class Hello extends Service {
  async getPG() {
    const { ctx, config } = this;

    let sql = `select * from ${config.info.pg_table} limit ${
      config.info.pg_count
    } offset ${config.info.pg_from}`;
    let sequelize = new Sequelize(config.sequelize);
    let result = await sequelize.query(sql);
    return result;
  }
  async getMG() {
    let z = 5,
      y = 11,
      x = 26;
    let result = await this.ctx.model.Tile.findOne({
      zoom_level: z || 0,
      tile_column: x || 0,
      tile_row: y || 0
    });
    if (!result) {
      return { result: "not found" };
    }

    return result.tile_data;
  }
  async addMG(type = 1) {
    const { ctx, config } = this;
    let data = config.create_data.mg_small;
    if (type === 2) {
      data = config.create_data.mg_middle;
    } else if (type === 3) {
      data = config.create_data.mg_big;
    }
    let buffer = Buffer.from(data, "base64");
    let result_count = await this.ctx.model.Tile.count();
    let count = result_count || 1;
    let item = {
      tile_column: count + 1,
      tile_row: 3,
      zoom_level: 3,
      tile_data: data
    };
    let result = await this.ctx.model.Tile.create(item);
    return result;
  }

  async addMGMany(type = 1, count = 1000) {
    const { ctx, config } = this;
    let data = config.create_data.mg_small;
    if (type === 2) {
      data = config.create_data.mg_middle;
    } else if (type === 3) {
      data = config.create_data.mg_big;
    }
    let buffer = Buffer.from(data, "base64");

    let result_count = await this.ctx.model.Tile.count();
    let current_count = result_count || 0;
    // let num = Math.ceil(count / 1000);
    let result = { result: "ok" };
    // for (let n = 0; n < num; n++) {
    // let bulk = [];
    for (let m = 0; m < count; m++) {
      current_count += 1;
      let item = {
        tile_column: current_count,
        tile_row: 3,
        zoom_level: 3,
        tile_data: data
      };
      // bulk.push(item);
      result = await this.ctx.model.Tile.create(item);
    }
    // result = await this.ctx.model.Tile.bulkCreate(bulk);
    // }
    return result;
  }
}
module.exports = Hello;
