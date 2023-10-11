const getDB = require("../../getDB.js");

const selectOwnProductsQuery = async (
  C_NUMERO,
  C_GRUPO,
  C_TARIFA,
  page,
  itemsPerPage
) => {
  let connection;

  try {
    connection = await getDB();

    const offset = (page - 1) * itemsPerPage;

    const ownProducts = await connection.query(
      `SELECT RTRIM(A_CODIGO) as A_CODIGO, A_DESCRIP, preciosespeciales.Q_PRECIO, articulos.A_P_VENTA${C_TARIFA}, FORMATO, MARCA FROM articulos INNER JOIN preciosespeciales ON articulos.A_CODIGO=preciosespeciales.Q_CODIGO WHERE (preciosespeciales.Q_NUM_CLI= ? OR preciosespeciales.Q_GRUPO=?) LIMIT ? OFFSET ?`,
      [C_NUMERO, C_GRUPO, itemsPerPage, offset]
    );

    const numProducts = await connection.query(
      `SELECT COUNT(A_CODIGO) AS COUNT
        FROM articulos INNER JOIN preciosespeciales ON
        articulos.A_CODIGO=preciosespeciales.Q_CODIGO WHERE 
        (articulos.Q_NUM_CLI= ? OR preciosespeciales.Q_GRUPO=?) `,
      [C_NUMERO, C_GRUPO]
    );

    return { ownProducts, numProducts };
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectOwnProductsQuery;
