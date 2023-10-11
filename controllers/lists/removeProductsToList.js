const removeProductToListQuery = require("../../db/queries/lists/removeProductToListQuery");
const selectListsQuery = require("../../db/queries/lists/selectListsQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const { generateError } = require("../../helpers");

const removeProductsToList = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const idList = parseInt(req.params.idList);
    const { idProduct } = req.body;

    const dataUser = await selectUserDataQuery(userId);

    const lists = await selectListsQuery(dataUser.C_NUMERO);

    if (lists.find((list) => list.id === idList)) {
      await removeProductToListQuery(idList, idProduct);
    } else {
      generateError("La lista no existe", 404);
    }

    res.send({
      status: "Producto eliminado de la lista",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = removeProductsToList;
