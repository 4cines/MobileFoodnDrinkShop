const getDB = require("../../getDB");

const selectProductToCartQuery = async (idCart, idProduct) => {
    let connection;

    try{
        connection = await getDB();

        const listProductsToCart = await connection.query(`SELECT * FROM carts_productos WHERE idCart = ? AND idProducto = ?`, [idCart, idProduct]);

        return listProductsToCart;
        
    } finally {

        if (connection) connection.release();
    }
}

module.exports = selectProductToCartQuery;