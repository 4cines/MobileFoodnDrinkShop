const selectNumAlbaranQuery = require("../../db/queries/order/selectNumAlbaran");
const selectOnlyOrderQuery = require("../../db/queries/order/selectOnlyOrderQuery");
const selectSignatureQuery = require("../../db/queries/order/selectSignatureQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const { generateError } = require("../../helpers");
const ftpSignature = require("../ftpSignatures");

const getOnlySignature = async (req, res, next) => {
  try {
    const idOrder = req.params.idOrder;
    const [alb_gesco] = await selectNumAlbaranQuery(idOrder);

    // await ftpSignature(alb_gesco.alb_gesco);

    if (!alb_gesco) {
      generateError("No existe número de albarán gesco", 404);
    }
    const signature = await selectSignatureQuery(alb_gesco.alb_gesco);

    res.send({
      status: "ok",
      data: signature,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOnlySignature;
