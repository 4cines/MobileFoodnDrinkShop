const insertProductsToList = require("../../db/queries/lists/insertProductsToListQuery");
const selectListsQuery = require("../../db/queries/lists/selectListsQuery");
const selectProductsToList = require("../../db/queries/lists/selectProductsToListQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const { generateError } = require("../../helpers");

const addProductsToList = async (req, res, next) => {
  try {
    const idUser = req.user.id;
    const { idList } = req.params;
    const { cantidad, idProduct } = req.body;

    if (!cantidad)
      generateError("Se debe introducir la cantidad de producto", 400);

    const dataUser = await selectUserDataQuery(idUser);

    const lists = await selectListsQuery(dataUser.C_NUMERO);

    if (!lists.find((list) => list.id === +idList)) {
      generateError("La lista no existe", 404);
    }

    const productsToList = await selectProductsToList(
      idList,
      dataUser.C_TARIFA
    );

    if (productsToList.length > 0) {
      for (const productToList of productsToList) {
        if (idProduct === productToList.L_CODIGO)
          generateError("El producto ya se encuentra en la lista", 400);
      }
    }

    await insertProductsToList(idList, idProduct, cantidad);

    res.send({
      status: `Se han añadido correctamente los productos a la lista`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addProductsToList;
