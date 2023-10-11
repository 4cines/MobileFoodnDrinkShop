const insertNewListQuery = require("../../db/queries/lists/insertNewListQuery");
const selectListsQuery = require("../../db/queries/lists/selectListsQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const { generateError } = require("../../helpers");

const createList = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { nameList } = req.body;

    if (!nameList)
      generateError("Se debe introducir un nombre para la nueva lista", 400);

    const dataUser = await selectUserDataQuery(userId);

    const lists = await selectListsQuery(dataUser.C_NUMERO);

    if (lists.find((list) => list.Nombre === nameList))
      generateError("Ya existe una lista con ese nombre", 400);

    await insertNewListQuery(dataUser.C_NUMERO, nameList);

    res.send({
      status: `La lista ${nameList} ha sido creada`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createList;
