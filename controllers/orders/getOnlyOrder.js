const selectOnlyOrderQuery = require("../../db/queries/order/selectOnlyOrderQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");

const getOnlyOrder = async(req, res, next) => {
    try {

        const userId = req.user.id;

        const dataUser = await selectUserDataQuery(userId);

        const {idOrder} = req.params;
        //idOrder es n

        const order = await selectOnlyOrderQuery(dataUser.C_NUMERO, idOrder);


        res.send({
            status: "ok",
            data: order
        })

    } catch(err) {
        next(err);
    }
}

module.exports = getOnlyOrder;