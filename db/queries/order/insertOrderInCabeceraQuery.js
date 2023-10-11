const getDB = require("../../getDB.js");

const inserOrderInCabeceraQuery = async (
  C_NUMERO,
  randomNumber,
  { fechaServicio, fechaPedido }
) => {
  let connection;

  try {
    connection = await getDB();

    const [lastNumAlbaran] = await connection.query(
      `SELECT MAX(n_albaran) as n_albaran FROM cabecerapedidos `
    );

    const result = await connection.query(
      `INSERT INTO cabecerapedidos SET f_servicio = ?, n_cliente = ?, n_albaran = ?, estado = 'Grabado', Incidencias = 3, h_pedido = ?, observaciones = 'pedido APP', n_pedido_cliente = ?`,
      [
        fechaServicio,
        C_NUMERO,
        lastNumAlbaran.n_albaran + 1,
        fechaPedido,
        randomNumber,
      ]
    );

    const lastId = result.insertId.toString();

    const resultsQueryCabecera = await connection.query(
      `SELECT n_albaran, n FROM cabecerapedidos WHERE n=?`,
      [parseInt(lastId)]
    );

    return resultsQueryCabecera;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = inserOrderInCabeceraQuery;
