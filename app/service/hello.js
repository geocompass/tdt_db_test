const util = require("../util/")
const Service = require("egg").Service;
const Sequelize = require("sequelize");

class Hello extends Service {
  async getPG({
    type = 1,
    from = 0,
    count = 40
  }) {
    const {
      ctx,
      config
    } = this;
    let pg_table = config.info.pg_table_x;
    if (type == 2) {
      pg_table = config.info.pg_table_z;
    } else if (type == 3) {
      pg_table = config.info.pg_table_d;
    }

    let sql = `select * from ${pg_table} limit ${
     count
    } offset ${from}`;
    let sequelize = new Sequelize(config.sequelize);
    let result = await sequelize.query(sql);
    return {
      code: config.info.code,
      data: result
    };
  }
  async addPG({
    type = 1
  }) {
    const {
      ctx,
      config
    } = this;
    let wkt = util.pg_small;
    let pg_table = config.info.pg_table_x;
    if (type == 2) {
      wkt = util.pg_middle;
      pg_table = config.info.pg_table_z;
    } else if (type == 3) {
      wkt = util.pg_big;
      pg_table = config.info.pg_table_d;
    }
    let sql = `insert into ${pg_table} (geom) values(ST_setSrid(ST_AsText('${wkt}'),4326))`;
    let sequelize = new Sequelize(config.sequelize);
    let result = await sequelize.query(sql);
    return result;
  }
  async addPGMany({
    type = 1,
    count
  }) {
    const {
      ctx,
      config
    } = this;
    let wkt = util.pg_small;
    let pg_table = config.info.pg_table_x;
    if (type == 2) {
      wkt = util.pg_middle;
      pg_table = config.info.pg_table_z;
    } else if (type == 3) {
      wkt = util.pg_big;
      pg_table = config.info.pg_table_d;
    }

    let sql = `insert into ${pg_table} (geom) values(ST_setSrid(ST_AsText('${wkt}'),4326))`;
    let sequelize = new Sequelize(config.sequelize);
    let result = null;
    for (let m = 0; m < count; m++) {
      result = await sequelize.query(sql);
    }

    return {
      code: config.info.code,
      data: result
    }
  }
  async getMG({
    x = 1
  }) {
    const {
      ctx,
      config
    } = this;
    let query = {
      zoom_level: 3,
      tile_column: x,
      tile_row: 3
    }
    let result = await this.ctx.model.Tile.findOne(query);
    if (!result) {
      return {
        data: "not found"
      };
    }
    return {
      code: config.info.code,
      data: result.tile_data
    };
  }
  async addMG(type = 1) {
    const {
      ctx,
      config
    } = this;
    let data = util.mg_small;
    if (type === 2) {
      data = util.mg_middle;
    } else if (type === 3) {
      data = util.mg_big;
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
    return {
      code: config.info.code,
      data: result
    };
  }
  async addMGMany(type = 1, count = 1000) {
    const {
      ctx,
      config
    } = this;
    let data = util.mg_small;
    if (type === 2) {
      data = util.mg_middle;
    } else if (type === 3) {
      data = util.mg_big;
    }
    let buffer = Buffer.from(data, "base64");

    let result_count = await this.ctx.model.Tile.count();
    let current_count = result_count || 0;
    let result = {
      result: "ok"
    };
    for (let m = 0; m < count; m++) {
      current_count += 1;
      let item = {
        tile_column: current_count,
        tile_row: 3,
        zoom_level: 3,
        tile_data: data
      };
      result = await this.ctx.model.Tile.create(item);
    }
    return {
      code: config.info.code,
      data: result
    };
  }
}
module.exports = Hello;