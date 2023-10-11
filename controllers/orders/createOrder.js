const selectAllProductsToCartQuery = require("../../db/queries/carts/selectAllProductsToCartQuery");
const selectCartsQuery = require("../../db/queries/carts/selectCartsQuery");
const inserOrderInCabeceraQuery = require("../../db/queries/order/insertOrderInCabeceraQuery");
const createOrderQuery = require("../../db/queries/order/insertOrdersQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {
  generateError,
  generateTodayDate,
  generateServiceDayName,
} = require("../../helpers");

const createOrder = async (req, res, next) => {
  try {
    const idUser = parseInt(req.user.id);

    const { orderDates } = req.body;

    const userData = await selectUserDataQuery(idUser);

    const idCart = await selectCartsQuery(userData.C_NUMERO);

    const productsInCart = await selectAllProductsToCartQuery(
      idCart[0].id,
      userData.C_TARIFA
    );

    if (productsInCart.length === 0)
      generateError("El carrito está vacío", 400);

    function randomNumberFunction(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomNumber = `APP-${randomNumberFunction(10000, 100000000)}`;

    const [resultsQueryCabecera] = await inserOrderInCabeceraQuery(
      userData.C_NUMERO,
      randomNumber,
      orderDates
    );

    for (const productInCart of productsInCart) {
      await createOrderQuery(
        productInCart,
        userData.C_NUMERO,
        orderDates,
        resultsQueryCabecera
      );
    }

    res.send({
      status: "Se ha realizado el pedido correctamente",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createOrder;
