const mysql = require("mysql2/promise");

const { HOST, USER, PASS, DB } = process.env;

let pool;

const getDB = async () => {
  try {
    if (!pool) {
      pool = await mariadb.createPool({
        connectionLimit: 10,
        host: HOST,
        user: USER,
        password: PASS,
        database: DB,
      });
    }

    return await pool.getConnection();
  } catch (err) {
    console.error(err);
    throw new Error("Error connecting to the database");
  }
};

module.exports = getDB;
