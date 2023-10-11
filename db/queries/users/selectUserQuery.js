const { generateError } = require("../../../helpers");
const getDB = require("../../getDB.js");

const selectUserQuery = async (userName) => {
  let connection;

  try {
    connection = await getDB();

    let user = await connection.query(
      `SELECT * FROM usuarios WHERE Usuario = ?`,
      [userName]
    );

    if (user.length < 1) {
      generateError("Usuario no válido", 404);
    }

    return user;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserQuery;
