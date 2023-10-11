const getDB = require("../../getDB")

const insertProductToCart = async (idCart, idProduct, quantity) => {
    
    let connection;

    try {
        connection = await getDB();

        connection.query("INSERT INTO carts_productos (idCart, idProducto, cantidad) VALUES (?, ?, ?)", [idCart, idProduct, quantity]        
        )
    } finally {
        if (connection) connection.release();
    }
}

module.exports = insertProductToCart;