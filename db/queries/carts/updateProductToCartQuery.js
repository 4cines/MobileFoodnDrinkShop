const getDB = require("../../getDB");

const updateProductToCartQuery = async (idCart, idProduct, quantity) => {
    let connection;

    try{
        console.log("idCart", idCart, "idProduct", idProduct, "quantity", quantity);
        
        connection = await getDB();

        const result =await connection.query(`UPDATE carts_productos SET cantidad = ? WHERE idProducto = ? AND idCart = ?`, [quantity, idProduct, idCart]);

        console.log("result", result);
    } finally {
        if(connection) connection.release();
    }
}

module.exports = updateProductToCartQuery;