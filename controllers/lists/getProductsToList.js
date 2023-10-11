const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const selectListsQuery = require("../../db/queries/lists/selectListsQuery");
const {generateError} = require("../../helpers");
const selectProductsToList = require("../../db/queries/lists/selectProductsToListQuery");

const getProductToList= async (req, res, next) => {
    try{

        const idList = parseInt(req.body.idList);
        const userId = req.user.id;

        const userData = await selectUserDataQuery(userId);

        const userLists = await selectListsQuery(userData.C_NUMERO);

        const {C_TARIFA}= userData;

        if(!userLists.find(list => list.id === idList)) generateError("No hay listas", 404);

        const productsToList = await selectProductsToList(idList, C_TARIFA);

        if(productsToList.length === 0) generateError("No hay productos en la lista", 404);

        
        res.send({
            status: 'ok',
            data: productsToList
        })

    } catch(err){
        next(err);
    }
}

module.exports = getProductToList;