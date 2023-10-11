const getDB = require("../../getDB.js");

const selectNumOrdersQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const infoOdrders = await connection.query(
      `SELECT f_servicio, alb_gesco, estado, h_pedido, n, n_pedido_cliente FROM cabeceraPedidos WHERE n_cliente = ? ORDER BY h_pedido DESC`,
      [idUser]
    );

    return infoOdrders;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNumOrdersQuery;
