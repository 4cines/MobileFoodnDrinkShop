const getDB = require("../../getDB");

const removeListQuery = async(idLista) => {
    let connection;

    try{

        connection = await getDB();
        connection.query('DELETE FROM listas WHERE id = ?', [idLista]);

    } finally {
        if(connection) connection.release();
    }
}

module.exports = removeListQuery;