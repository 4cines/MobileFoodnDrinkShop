const selectNumOrdersQuery = require("../../db/queries/order/selectNumOrdersQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const { generateError } = require("../../helpers");

const getOrders = async(req, res, next) => {
    try{

        const userId = parseInt(req.user.id);

        const userData = await selectUserDataQuery(userId);

        const numOrders = await selectNumOrdersQuery(userData.C_NUMERO);

        if(numOrders.length < 1) generateError("No hay pedidos", 404);

        res.send({
            status: "ok",
            data: numOrders
        })


    } catch(err){
        next(err);
    }
}

module.exports = getOrders;