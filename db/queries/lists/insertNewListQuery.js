const getDB= require("../../getDB");

const insertNewListQuery = async(idUser, nameList)=>{
    let connection;
    try{

        connection = await getDB();

        await connection.query(`INSERT INTO listas (Nombre, C_CLIENTE) VALUES (?, ?)`, [nameList, idUser]);


    } finally{
        if (connection) connection.release();
    }
}

module.exports= insertNewListQuery;