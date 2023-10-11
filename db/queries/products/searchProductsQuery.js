const getBD = require("../../getDB.js");

const searchProductsQuery = async (searchParam, C_TARIFA) => {
  let connection;

  try {
    connection = await getBD();

    const resultSearch = await connection.query(
      `SELECT  RTRIM(A_CODIGO) as A_CODIGO,A_DESCRIP,
            A_P_VENTA${C_TARIFA},MARCA,FORMATO 
            FROM articulos WHERE A_CODIGO LIKE ? OR
            A_DESCRIP LIKE ?`,
      [`%${searchParam}%`, `%${searchParam}%`]
    );

    return resultSearch;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = searchProductsQuery;
