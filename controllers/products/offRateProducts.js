const selectAllProductsQuery = require("../../db/queries/products/selectAllProductsQuery");
const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {generateError} = require("../../helpers");


const offRateProducts = async (req, res, next) => {
  try {
    const userInfo = await selectUserDataQuery(req.user.id);
    
    const {C_NUMERO, C_GRUPO, C_TARIFA} = userInfo;

    const page = parseInt(req.query.page);
    const itemsPerPage = parseInt(req.query.itemsPerPage);

    const allProductsAndNumProductsWithoutFilter = await selectAllProductsQuery(C_NUMERO, C_GRUPO, C_TARIFA, page, itemsPerPage);


    if(allProductsAndNumProductsWithoutFilter.allProducts.length<1) generateError("No se encontraron productos", 404);

    const allProductsAndNumProducts= allProductsAndNumProductsWithoutFilter.allProducts.filter(function (item) {
      return item.A_CODIGO && item.A_CODIGO.length >= 3 && item[`A_P_VENTA${C_TARIFA}`] !== null
    });

    const numProducts = allProductsAndNumProductsWithoutFilter.numProducts[0].COUNT;

    res.send({
      status: "ok",
      data: {
        allProducts: allProductsAndNumProducts,
        numProducts: numProducts.toString(),
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports= offRateProducts;