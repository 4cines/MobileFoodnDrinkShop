const getDB = require("../../getDB.js");

const selectAllProductsQuery = async (
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
    const query = `
          SELECT RTRIM(A_CODIGO) as A_CODIGO, A_DESCRIP, Q_PRECIO, A_P_VENTA${C_TARIFA}, MARCA, FORMATO
          FROM articulos
          WHERE A_CODIGO NOT IN (
            SELECT RTRIM(A_CODIGO) as A_CODIGO
            FROM articulos
            INNER JOIN preciosespeciales ON articulos.A_CODIGO = preciosespeciales.Q_CODIGO
            WHERE (preciosespeciales.Q_NUM_CLI = ? OR preciosespeciales.Q_GRUPO = ?)
          )
          LIMIT ? OFFSET ?
        `;
    const params = [C_NUMERO, C_GRUPO, itemsPerPage, offset];

    const allProducts = await connection.query(query, params);

    const numProducts = await connection.query(
      `SELECT COUNT(A_CODIGO) AS COUNT
        FROM articulos
        WHERE A_CODIGO NOT IN (
          SELECT RTRIM(A_CODIGO) as A_CODIGO
          FROM articulos
          INNER JOIN preciosespeciales ON articulos.A_CODIGO = preciosespeciales.Q_CODIGO
          WHERE (preciosespeciales.Q_NUM_CLI = ? OR preciosespeciales.Q_GRUPO = ?))`,
      [C_NUMERO, C_GRUPO]
    );

    return { allProducts, numProducts };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllProductsQuery;
