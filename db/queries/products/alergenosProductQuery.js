const getDB = require("../../getDB");

const alergenosProductQuery = async (idProduct) => {
  let connection;

  try {
    connection = await getDB();

    const alergenos = await connection.query(
      `SELECT A_CODIGO, TRIGO, CENTENO, CEBADA, AVENA, ESPELTA, KAMUT, HIBRIDOS, CRUSTACEOS, HUEVOS, PESCADO, CACAHUETES, SOJA, LECHE, APIO, MOSTAZA, SESAMO, SULFITOS, ALTRAMUCES, MOLUSCOS, CASCARA FROM alergenos WHERE A_CODIGO = ?;`,
      [idProduct]
    );

    return alergenos;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = alergenosProductQuery;
