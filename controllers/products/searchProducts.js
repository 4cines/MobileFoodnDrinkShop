const searchProductsQuery = require("../../db/queries/products/searchProductsQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {generateError} = require("../../helpers");

const searchProducts= async(req, res, next)=>{
try{

    const userId = req.user.id;
    const searchParam = req.params.searchParam;

    const dataUser = await selectUserDataQuery(userId);

    const resultSearch = await searchProductsQuery(searchParam, dataUser.C_TARIFA);

    if(resultSearch.length<1) generateError("No se encontraron productos", 404);

    res.send({
        status: "ok",
        data: resultSearch
    });

}catch(err){
    next(err);
}
   
}
    
module.exports= searchProducts;