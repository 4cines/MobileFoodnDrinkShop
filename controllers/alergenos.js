const alergenosProductQuery = require("../db/queries/products/alergenosProductQuery");
const { generateError } = require("../helpers")

const alergenosController = async(idProduct) => {
    try{

        const alergenosData = await alergenosProductQuery(idProduct);

        return alergenosData;

    } catch (err){
        generateError("Algo salio mal", 404);
    }
    
}

module.exports = alergenosController;