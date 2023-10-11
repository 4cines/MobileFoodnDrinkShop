const getDB = require("../../getDB.js");
const selectUserDataQuery = require("../users/selectUserDataQuery.js");

const selectOnlyProductQuery = async (idProduct, userId) => {
  let connection;
  try {
    connection = await getDB();

    const userData = await selectUserDataQuery(userId);

    const products = await connection.query(
      `
            SELECT A_DESCRIP, RTRIM(articulos.A_CODIGO) as A_CODIGO, 
            A_P_VENTA${userData.C_TARIFA}, FORMATO, MARCA FROM articulos
            WHERE A_CODIGO= ?
            `,
      [idProduct]
    );

    return products;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectOnlyProductQuery;
