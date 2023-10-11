const selectListsQuery = require("../../db/queries/lists/selectListsQuery.js");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery.js");
const { generateError } = require("../../helpers.js");
const getLists = async (req, res, next) => {
  try {
    const idUser = req.user.id;

    const userData = await selectUserDataQuery(idUser);

    const lists = await selectListsQuery(userData.C_NUMERO);

    if (lists.length < 1) generateError("No hay listas", 404);

    res.send({
      status: "ok",
      data: lists,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getLists;
