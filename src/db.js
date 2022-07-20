const pg = require("pg");

const client = new pg.Client({
  user: "jrmukwmc",
  host: "tuffi.db.elephantsql.com",
  database: "jrmukwmc",
  password: "cAuer1MQ7umJ0ULe3JdI2nIF-Co6ftGF",
  port: 5432,
});
client.connect();
module.exports = client;
