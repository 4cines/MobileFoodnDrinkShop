const removeAllProductsToCartQuery = require("../../db/queries/carts/removeAllProductsToCartQuery");
const selectAllProductsToCartQuery = require("../../db/queries/carts/selectAllProductsToCartQuery");
const selectCartsQuery = require("../../db/queries/carts/selectCartsQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const { generateError } = require("../../helpers");

const removeAllProductsToCart = async (req, res, next) => {
  try {
    const idUser = req.user.id;

    const dataUser = await selectUserDataQuery(idUser);

    const cart = await selectCartsQuery(dataUser.C_NUMERO);

    const productsToCart = await selectAllProductsToCartQuery(
      cart[0].id,
      dataUser.C_TARIFA
    );

    if (productsToCart.length < 1) generateError("El carrito está vacío", 404);

    await removeAllProductsToCartQuery(cart[0].id);

    res.send({
      status: "Se ha vaciado el carrito",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = removeAllProductsToCart;
