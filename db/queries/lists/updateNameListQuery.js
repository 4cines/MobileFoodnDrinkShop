const getDB = require("../../getDB");

const updateNameQuery = async(idList, nameList)=>{
    let connection;

    try{

        connection = await getDB();

        await connection.query(`UPDATE listas SET Nombre = ? WHERE id = ?`, [nameList, idList]);

    } finally{

        if (connection) connection.release();
    }
    
}

module.exports= updateNameQuery;