const removeListQuery = require("../../db/queries/lists/removeListQuery");
const removeProductToListQuery = require("../../db/queries/lists/removeProductToListQuery");
const selectListsQuery = require("../../db/queries/lists/selectListsQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const selectProductsToListQuery = require("../../db/queries/lists/selectProductsToListQuery");

const {generateError} = require("../../helpers");

const removeList = async(req, res, next) => {
    try{

        const idList = parseInt(req.params.idList);
        const userId = req.user.id;

        const dataUser = await selectUserDataQuery(userId);

        const lists = await selectListsQuery(dataUser.C_NUMERO);

        if(lists.find(list => list.id === idList)){

            const productsToRemove = await selectProductsToListQuery(idList, dataUser.C_TARIFA);

            if(productsToRemove && productsToRemove.length > 0){
                for (const product of productsToRemove) {
                    await removeProductToListQuery(idList, product.L_CODIGO);	
                }
            }
            
             await removeListQuery(idList);

            res.send({
                status: "Lista eliminada"
            })
        } else {
            generateError("La lista no existe", 404);
        }

    
    }catch(err){
        next(err);
    }
}

module.exports = removeList;