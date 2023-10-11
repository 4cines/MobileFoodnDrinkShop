const selectOnlyProductQuery = require("../../db/queries/products/selectOnlyProductQuery");
const { generateError } = require("../../helpers");
const alergenosController = require("../alergenos");
//const ftpFile = require("../ftpFile");
//const ftpSignature = require("../ftpSignatures");

const onlyProduct = async (req, res, next) => {
  try {
    const idProduct = req.params.idProduct;

    const userId = req.user.id;

    const dataProduct = await selectOnlyProductQuery(idProduct, userId);

    if (dataProduct.length < 1)
      generateError("No se encontraron productos", 404);

    // const ftpFileData = await ftpFile(idProduct);

    const alergenosData = await alergenosController(idProduct);

    res.send({
      status: "ok",
      data: dataProduct[0],
      // ftpFile: ftpFileData,
      alergenosData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = onlyProduct;
