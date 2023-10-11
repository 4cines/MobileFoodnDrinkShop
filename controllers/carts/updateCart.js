const selectCartsQuery = require("../../db/queries/carts/selectCartsQuery");
const selectProductToCartQuery = require("../../db/queries/carts/selectProductToCartQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {generateError} = require("../../helpers");
const updateProductToCartQuery = require("../../db/queries/carts/updateProductToCartQuery");

const updateCart = async(req, res, next) => {
    try{

        const quantity = parseInt(req.body.quantity);
        const idUser = req.user.id;
        const {idProduct} = req.body;

        if(quantity < 1) generateError("La cantidad debe ser mayor a 0", 400);

        const dataUser = await selectUserDataQuery(idUser);

        const cart = await selectCartsQuery(dataUser.C_NUMERO);

        if(cart.length === 0 ) generateError("El carrito no existe", 404);

        const productsToCart = await selectProductToCartQuery(cart[0].id, idProduct);

        if(productsToCart.length < 1) generateError("El producto no se encuentra en el carrito", 404);

        await updateProductToCartQuery(cart[0].id, idProduct, quantity);

        res.send({
            status: "ok"
        })


    } catch(err) {
        next(err);
    }
}

module.exports = updateCart;