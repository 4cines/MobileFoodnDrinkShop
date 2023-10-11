const getDB= require("../../getDB.js");

const selectListsQuery = async(C_NUMERO)=>{
    let connection;

    try{
        connection = await getDB();

        const lists = await connection.query(`SELECT * FROM listas WHERE C_CLIENTE=?`, [C_NUMERO]);

        return lists;


    } finally{

        if (connection) connection.release();
    }
}

module.exports= selectListsQuery;