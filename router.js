const express = require("express");
const { loginController, signUpController } = require("./authController");
const { addProductController, getAllProducts, getFeaturedProducts, getRecentProducts, getProdByIDController, getProdByCatIDController, addCategoryController, getCategoriesController, addNewOrderController} = require("./controller");


let UserApp = express();
let ProductApp = express();
let CategoryApp = express();
let OrderApp = express();
function loadUserRoutes(MainApp){

    UserApp.post("/auth/login",loginController);
    UserApp.post("/auth/signup",signUpController);
    MainApp.use("/api/users",UserApp);
}
function loadProductRoutes(MainApp){

    ProductApp.post("",addProductController);
    ProductApp.get("",getAllProducts);
    ProductApp.get("/getFeatured",getFeaturedProducts);
    ProductApp.get("/getRecent",getRecentProducts);
    ProductApp.get("/getProdByID",getProdByIDController);
    ProductApp.get("/getProdByCatID",getProdByCatIDController);
    MainApp.use("/api/products",ProductApp);
}

function loadCategoryRoutes(MainApp){
    CategoryApp.post("",addCategoryController);
    CategoryApp.get("",getCategoriesController);
    MainApp.use("/api/categories",CategoryApp);

}

function loadOrderRoutes(MainApp){
    OrderApp.post("",addNewOrderController);
    MainApp.use("/api/orders",OrderApp);
}


function loadRoutes(MainApp) {
    
    loadUserRoutes(MainApp);
    loadProductRoutes(MainApp);
    loadCategoryRoutes(MainApp);
    loadOrderRoutes(MainApp);
}

module.exports = {loadRoutes}