const getDB = require("../../getDB.js");

const createOrderQuery = async (
  { L_DESCVRIPCION, L_CODIGO, L_P_UNIT, cantidad },
  C_NUMERO,
  { fechaServicio, fechaPedido },
  { n_albaran, n }
) => {
  let connection;

  try {
    connection = await getDB();

    connection.query(
      `INSERT INTO pedidos SET L_CANTIDAD = ?, L_P_UNIT= ?, L_DESVRIPCION = ?, L_CODIGO = ?, f_servicio = ?, n_cliente = ?, n_albaran= ?, estado = 'Grabado', h_pedido=?, observaciones = 'pedido APP', n=?`,
      [
        cantidad,
        L_P_UNIT,
        L_DESCVRIPCION,
        L_CODIGO,
        fechaServicio,
        C_NUMERO,
        n_albaran,
        fechaPedido,
        n,
      ]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createOrderQuery;
