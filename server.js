require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

//MIDDLEWARES

app.use(cors());

app.use(morgan("combined"));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads', 'signatures')));

const isAuth = require("./middleware/isAuth");

// CONTROLLERS

const loginUser = require("./controllers/users/loginUser");
const getUserInfo = require("./controllers/users/getUserInfo");

const offRateProducts = require("./controllers/products/offRateProducts");
const onlyProduct = require("./controllers/products/onlyProduct");
const searchProducts = require("./controllers/products/searchProducts");
const ownProducts = require("./controllers/products/ownProducts");

const getLists = require("./controllers/lists/getLists");
const createList = require("./controllers/lists/createList");
const updateList = require("./controllers/lists/updateList");
const addProductsToList = require("./controllers/lists/addProductsToList");
const removeProductsToList = require("./controllers/lists/removeProductsToList");
const removeList = require("./controllers/lists/removeList");
const getProductsToList = require("./controllers/lists/getProductsToList");

const getCartWithProducts = require("./controllers/carts/getCartWithProducts");
const addProductsToCart = require("./controllers/carts/addProductToCart");
const createCart = require("./controllers/carts/createCart");
const removeProductToCart = require("./controllers/carts/removeProductToCart");
const updateCart = require("./controllers/carts/updateCart");
const createOrder = require("./controllers/orders/createOrder");
const removeAllProductsToCart = require("./controllers/carts/removeAllProductsToCart");
const getNumOrders = require("./controllers/orders/getNumOrders");
const getOnlyOrder = require("./controllers/orders/getOnlyOrder");
const getOnlySignature = require("./controllers/orders/getOnlySignature");
const ftpSignature = require("./controllers/ftpSignatures");

//FTP

app.get("/ftpSignatures/:signature", ftpSignature);

//ENDPOINTS

//loginUser
app.post("/login", loginUser);

//data user
app.get("/user", isAuth, getUserInfo);

//own products
app.get("/ownProducts", isAuth, ownProducts);

//all products without own products
app.get("/off-rateProducts", isAuth, offRateProducts);

//show one product
app.post("/product/:idProduct", isAuth, onlyProduct);

//search products
app.post("/search/:searchParam", isAuth, searchProducts);

//show own lists
app.get("/lists", isAuth, getLists);

//show products to list
app.post("/list/products", isAuth, getProductsToList);

//add list
app.post("/lists", isAuth, createList);

//modify list (name and quantity of products)
app.put("/lists/:idList", isAuth, updateList);

//delete list
app.delete("/lists/:idList", isAuth, removeList);

//add product to list
app.post("/lists/:idList/products", isAuth, addProductsToList);

//remove product to list
app.delete("/lists/:idList/products", isAuth, removeProductsToList);

//ELIMINAR CARRITO AL HACER PEDIDO (Hay que tenerlo en cuenta)

//create cart
app.post("/cart", isAuth, createCart);

//show products to cart
app.get("/cart/products", isAuth, getCartWithProducts);

//add product to cart
app.post("/cart/addProduct", isAuth, addProductsToCart);

//remove product to cart
app.delete("/cart/oneProduct", isAuth, removeProductToCart);

//remove all products to cart
app.delete("/cart/removeAllProducts", isAuth, removeAllProductsToCart);

//modify quantity of product in cart
app.put("/cart/updateQuantity", isAuth, updateCart);

//orders

//create order
app.post("/orders", isAuth, createOrder);

//show all orders
app.get("/orders", isAuth, getNumOrders);

//show one order
//idOrder es n
app.get("/orders/:idOrder", isAuth, getOnlyOrder);

//show signature
app.get("/orders/:idOrder/signature", isAuth, getOnlySignature);

//MIDDLEWARE ERROR

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.httpStatus || 500).send({
		status: "error",
		message: err.message,
	});
});

//MIDDLEWARE RUTA NO ENCONTRADA
app.use((req, res) => {
	res.status(404).send({
		status: "error",
		message: "Ruta no encontrada",
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening at ${PORT}`);
});
