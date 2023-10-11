const getDB = require("../../getDB");

const selectNumAlbaranQuery = async (idOrder) => {
  let connection;

  try {
    connection = await getDB();

    const numAlbaranGesco = await connection.query(
      `SELECT alb_gesco FROM pedidos WHERE n = ?`,
      [idOrder]
    );

    return numAlbaranGesco;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNumAlbaranQuery;
