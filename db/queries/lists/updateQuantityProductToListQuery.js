const getDB = require("../../getDB");

const updateQuantityProductToListQuery = async (idList, idProduct, quantity) => {

    let connection;
    try{
        connection = await getDB();

        await connection.query(`UPDATE listas_productos SET cantidad = ? WHERE idProducto = ? AND idLista = ?`, [quantity, idProduct, idList]);

    }finally{
        if(connection) connection.release();
    }
    
}

module.exports = updateQuantityProductToListQuery;