const insertProductToCart = require("../../db/queries/carts/inserProductToCartQuery");
const insertCartQuery = require("../../db/queries/carts/insertCartQuery");
const selectCartsQuery = require("../../db/queries/carts/selectCartsQuery");
const selectProductToCartQuery = require("../../db/queries/carts/selectProductToCartQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {generateError} = require("../../helpers");

const addProductsToCart = async (req, res, next) => {
    try{

        const idUser = req.user.id;
        const {idProduct, quantity} = req.body;

        if(!idProduct) generateError("Se debe introducir el id del producto", 400);
        if(!quantity) generateError("Se debe introducir la cantidad del producto", 400);

        const dataUser = await selectUserDataQuery(idUser);

        let cart = await selectCartsQuery(dataUser.C_NUMERO);

        if (cart.length === 0) {

            cart = await insertCartQuery(dataUser.C_NUMERO);
            await insertProductToCart(cart.id, idProduct, quantity);

        } else {
            const productsToCart = await selectProductToCartQuery(cart[0].id, idProduct);

            if(productsToCart.length > 0 ){
                for (const productToCart of productsToCart) {
                    if(idProduct === productToCart.idProducto) generateError("El producto ya se encuentra en el carrito", 400);
                }
        }
            await insertProductToCart(cart[0].id, idProduct, quantity);
        }

        res.send({
            status: "Producto añadido al carrito"
        })

    } catch(err){
        next(err);
    }
}

module.exports= addProductsToCart;