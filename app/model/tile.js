module.exports = app => {
  const { ctx, config } = this;
  // let tableName = config.info.mg_table;

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const Tiles = new Schema({
    zoom_level: Number,
    tile_column: Number,
    tile_row: Number,
    tile_data: Buffer
  });

  return mongoose.model("a_tile", Tiles, "a_tile");
};
