const selectOwnProducts = require("../../db/queries/products/selectOwnProducts");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {generateError} = require("../../helpers");

const ownProducts = async (req, res, next) => {
    try {
        const userInfo = await selectUserDataQuery(req.user.id);

        const {C_NUMERO, C_GRUPO, C_TARIFA} = userInfo;

        const page = parseInt(req.query.page);
        const itemsPerPage = parseInt(req.query.itemsPerPage);

        const ownProductsAndNumProductsWithoutFilter = await selectOwnProducts(C_NUMERO, C_GRUPO, C_TARIFA, page, itemsPerPage);

        if(ownProductsAndNumProductsWithoutFilter.ownProducts.length < 1) generateError("No se encontraron productos", 404);

        const ownProductsAndNumProducts= ownProductsAndNumProductsWithoutFilter.ownProducts.filter(function (item) {
            return item.A_CODIGO && item.A_CODIGO.length >= 3 && item[`A_P_VENTA${C_TARIFA}`] !== null
          });

        const numProducts = ownProductsAndNumProductsWithoutFilter.numProducts[0].COUNT;

        res.send({
            status: "ok",
            data: {
                ownProducts: ownProductsAndNumProducts,
                numProducts: numProducts.toString(),
            }
        })
    } catch (err) {
        next(err);
    }

}

module.exports = ownProducts;