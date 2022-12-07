const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Xyy021425.",
  database: "tea",
});

console.log(db);

module.exports = db;
