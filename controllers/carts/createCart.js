const insertCartQuery = require("../../db/queries/carts/insertCartQuery");
const selectCartsQuery = require("../../db/queries/carts/selectCartsQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {generateError} = require("../../helpers");

const createCart = async(req, res, next) => {
    try{
        const idUser = req.user.id;

        const dataUser = await selectUserDataQuery(idUser);
        
        const cart = await selectCartsQuery(dataUser.C_NUMERO);

        if(cart.length > 0) generateError("El carrito ya existe", 400);

        await insertCartQuery(dataUser.C_NUMERO);

        res.send({
            status: "Carrito creado correctamente",
        })

    } catch(err) {
        next(err);
    }
}

module.exports = createCart;