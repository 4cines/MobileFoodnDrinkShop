const getDB= require('../../getDB');

const removeAllProductsToCartQuery = async (idCart) => {
    let connection;

    try{
        connection = await getDB();

        await connection.query(`DELETE FROM carts_productos WHERE idCart = ?`, [idCart]);
    } finally {
        if(connection) connection.release();
    }
}

module.exports = removeAllProductsToCartQuery;