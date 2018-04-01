"use strict";

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1522235343778_9673";

  // add your config here
  config.middleware = [];

  //配置查询及插入的表名称等信息
  config.info = {
    // pg_table: "data_1050",
    code: 54, //机器编号
    pg_table_x: "test_xiao", //PG小表
    pg_table_z: "test_zhong", //PG中表
    pg_table_d: "test_da", //PG大表
    //mongo_config
    mg_table_x: "tiles_130", //MG小表
    mg_table_z: "tiles_130", //MG中表
    mg_table_d: "tiles_130", //MG大表
  };

  config.sequelize = {
    dialect: "postgres", // support: mysql, mariadb, postgres, mssql
    // host: "172.16.100.215",
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "postgres",
    database: "geoc_data",
    timezone: "+08:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      underscored: true,
      freezeTableName: true
    }
    // logging: { info: function() {} }
  };

  config.mongoose = {
    client: {
      url: "mongodb://172.16.100.215/geoc_tile",
      options: {}
    }
  };

  config.create_data = {

  };

  return config;
};