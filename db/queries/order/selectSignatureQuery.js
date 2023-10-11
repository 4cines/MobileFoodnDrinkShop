const getDB = require("../../getDB");

const selectSignatureQuery = async (alb_gesco) => {
    let connection;
    try {
        connection = await getDB();
        const signature = await connection.query(`SELECT * FROM firmas WHERE alb_gesco = ?`, [alb_gesco]);

        return signature;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = selectSignatureQuery;