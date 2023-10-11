const { generateError } = require("../../../helpers");
const getDB = require("../../getDB.js");

const selectUserDataQuery = async (userId) => {
  let connection;

  try {
    connection = await getDB();

    let [userInfo] = await connection.query(
      `SELECT C_E_MAIL, C_TELEFONO, C_NIF, C_NUMERO,C_EMPRESA,C_GRUPO, C_DOMICIL, C_DOM_ENV, C_LOC_ENV, C_TARIFA, SLUNES, SMARTES, SMIERCOLES, SJUEVES,SVIERNES,PLUNES, PMARTES,PMIERCOLES,PJUEVES,PVIERNES FROM clientes WHERE C_NUMERO IN (SELECT Cod_cli FROM users-web WHERE id_user = ?)`,
      [userId]
    );

    if (userInfo.length < 1) {
      generateError("Usuario no válido", 404);
    }

    return userInfo;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserDataQuery;
