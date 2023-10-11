const getDB = require("../../getDB");

const selectAllProductsToCartQuery = async (idCart, C_TARIFA) => {
  let connection;

  try {
    connection = await getDB();

    console.log(idCart, C_TARIFA);

    const allProductsToCart = await connection.query(
      `SELECT articulos.A_DESCRIP AS L_DESCVRIPCION, TRIM(articulos.A_CODIGO) AS L_CODIGO, TRIM(articulos.A_P_VENTA${C_TARIFA} )AS L_P_UNIT, carts_productos.cantidad, TRIM(articulos.MARCA) as MARCA, TRIM(articulos.FORMATO) as FORMATO, TRIM(articulos.PESONETO) as PESONETO  FROM articulos INNER JOIN carts_productos ON articulos.A_CODIGO=carts_productos.idProducto WHERE carts_productos.idCart = ?`,
      [idCart]
    );

    return allProductsToCart;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllProductsToCartQuery;
