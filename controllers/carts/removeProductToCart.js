const removeProductToCartQuery = require("../../db/queries/carts/removeProductToCartQuery");
const selectCartsQuery = require("../../db/queries/carts/selectCartsQuery");
const selectProductToCartQuery = require("../../db/queries/carts/selectProductToCartQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {generateError} = require("../../helpers");

const removeProductToCart = async(req, res, next)=>{
    try{
        const idUser = req.user.id;
        const {idProduct} = req.body;

        const dataUser = await selectUserDataQuery(idUser);

        const cart = await selectCartsQuery(dataUser.C_NUMERO);

        if(cart.length < 1) generateError("El carrito no existe", 404);

        console.log(idProduct)

        const productsToCart = await selectProductToCartQuery(cart[0].id, idProduct);

        if(productsToCart.length < 1) generateError("El producto no se encuentra en el carrito", 404);

        await removeProductToCartQuery(cart[0].id, idProduct);

        res.send({
            status: "Producto eliminado del carrito"
        })

    } catch(err){
        next(err);
    }
}   
module.exports = removeProductToCart;