const selectListsQuery = require("../../db/queries/lists/selectListsQuery");
const selectProductsToListQuery = require("../../db/queries/lists/selectProductsToListQuery");
const updateNameListQuery = require("../../db/queries/lists/updateNameListQuery");
const updateQuantityProductToListQuery = require("../../db/queries/lists/updateQuantityProductToListQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const { generateError } = require("../../helpers");

const updateList = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { nameList, idProduct } = req.body;
    const idList = parseInt(req.params.idList);

    const quantity = parseInt(req.body.quantity);

    const dataUser = await selectUserDataQuery(userId);

    const lists = await selectListsQuery(dataUser.C_NUMERO);

    if (!lists.find((list) => list.id == idList))
      generateError("No existe la lista", 400);

    //modify name
    if (nameList) {
      if (lists[0].Nombre === nameList)
        generateError("Ya existe una lista con ese nombre", 400);
      await updateNameListQuery(idList, nameList);
      res.send({
        status: `La lista "${nameList}" ha sido actualizada`,
      });
    }

    // modify quantity
    if (idProduct && quantity && quantity > 0) {
      const listProducts = await selectProductsToListQuery(
        idList,
        dataUser.C_TARIFA
      );

      if (!listProducts.find((item) => item.L_CODIGO === idProduct))
        generateError("El producto no esta en la lista", 400);

      await updateQuantityProductToListQuery(idList, idProduct, quantity);

      res.send({
        status: "Cantidad de producto modificada",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = updateList;
