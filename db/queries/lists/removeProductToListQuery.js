
const getDB = require("../../getDB")
const removeProductToListQuery = async (idList, idProduct) => {
    let connection;

    try{

        connection = await getDB();
        
        await connection.query(`DELETE FROM listas_productos WHERE idLista = ? AND idProducto = ?`, [idList, idProduct]);

    } finally{
        if (connection) connection.release();
    }
}
module.exports = removeProductToListQuery;