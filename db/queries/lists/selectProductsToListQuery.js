const getDB = require("../../getDB");

const { generateError } = require("../../../helpers");

const selectProductsToList = async (idList, C_TARIFA) => {
  let connection;

  try {
    connection = await getDB();

    const productsToList = await connection.query(
      `SELECT articulos.A_DESCRIP AS L_DESCVRIPCION,  RTRIM(articulos.A_CODIGO) AS L_CODIGO, articulos.A_P_VENTA${C_TARIFA} AS L_P_UNIT, listas_productos.cantidad, articulos.MARCA, articulos.FORMATO, articulos.PESONETO FROM articulos
        INNER JOIN listas_productos ON articulos.A_CODIGO=listas_productos.idProducto WHERE listas_productos.idLista = ? `,
      [idList]
    );

    return productsToList;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectProductsToList;
