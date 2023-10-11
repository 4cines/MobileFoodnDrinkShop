const insertCartQuery = require("../../db/queries/carts/insertCartQuery");
const selectAllProductsToCartQuery = require("../../db/queries/carts/selectAllProductsToCartQuery");
const selectCartsQuery = require("../../db/queries/carts/selectCartsQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const { generateError } = require("../../helpers");

const getCartWithProducts = async (req, res, next) => {
  try {
    const idUser = req.user.id;

    const dataUser = await selectUserDataQuery(idUser);

    const dataCart = await selectCartsQuery(dataUser.C_NUMERO);

    if (dataCart.length === 0) generateError("El carrito no existe", 404);

    const productsToCart = await selectAllProductsToCartQuery(
      dataCart[0].id,
      dataUser.C_TARIFA
    );

    res.send({
      status: "ok",
      data: productsToCart,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getCartWithProducts;
