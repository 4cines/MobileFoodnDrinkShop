const getDB = require("../../getDB");

const selectOnlyOrderQuery = async (C_NUMERO, idOrder) => {
  let connection;

  try {
    connection = await getDB();

    const dataOrder = await connection.query(
      `SELECT pedidos.n as n, pedidos.id AS id, pedidos.L_CAJAS AS L_CAJAS, pedidos.L_CANTIDAD AS L_CANTIDAD, pedidos.L_P_UNIT AS L_P_UNIT, 
        pedidos.L_DESVRIPCION AS L_DESVRIPCION, pedidos.L_CODIGO AS L_CODIGO, pedidos.f_servicio AS f_servicio, 
        cabeceraPedidos.alb_gesco AS alb_gesco, pedidos.h_pedido AS h_pedido FROM pedidos
        INNER JOIN cabeceraPedidos ON pedidos.n = cabeceraPedidos.n
        WHERE  cabeceraPedidos.n = ? AND pedidos.n_cliente = ?`,
      [idOrder, C_NUMERO]
    );

    return dataOrder;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectOnlyOrderQuery;
