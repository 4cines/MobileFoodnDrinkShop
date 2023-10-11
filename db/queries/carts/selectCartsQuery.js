const getDB= require("../../getDB");

const selectCartsQuery = async (idUser) => {
    let connection;

    try{

        connection = await getDB();

        const cart = await connection.query(
            `SELECT * FROM carts WHERE C_CLIENTE = ?`, [idUser]
        )

        console.log("CART",cart);

        return cart;

    } finally {
        if (connection) connection.release();
    }
}

module.exports = selectCartsQuery;