const getDB = require("../../getDB");

const removeProductToCartQuery = async (idCart, idProduct) => {
    let connection;

    try{

        connection = await getDB();

        await connection.query(`DELETE FROM carts_productos WHERE idCart = ? AND idProducto = ?;`, [idCart, idProduct]);

    } finally {
        if(connection) connection.release();
    }
}

module.exports = removeProductToCartQuery;