const getDB = require("../../getDB");
const selectProductsToList = require("./selectProductsToListQuery");

const insertProductsToList = async (idList, idProducto, cantidad) => {
    let connection 

    try{
        connection = await getDB();

        await connection.query(`INSERT INTO listas_productos (idLista, idProducto, cantidad) VALUES (?, ?, ?)`, [idList, idProducto, cantidad]);

    } finally {
        connection.release();
    }
    
}

module.exports = insertProductsToList;