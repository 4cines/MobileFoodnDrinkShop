const getDB = require("../../getDB");

const insertCartQuery = async (idUser) => {
    let connection;

    try{
    connection = await getDB();

    await connection.query(
        `INSERT INTO carts (C_CLIENTE) VALUES (?)`, [idUser]
    )

    const result = await connection.query('SELECT * FROM carts WHERE id = LAST_INSERT_ID()');
    
    const insertedCart = result[0];

    return insertedCart;

    } finally {
        if (connection) connection.release();
    }
}

module.exports = insertCartQuery;