const express = require("express");
const {loadRoutes} = require("./router");
const cors = require("cors");





const MainApp = express();

const PORT = 3000;
console.log("start loading Middleware")
MainApp.use(express.json());

MainApp.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
MainApp.use(function (req, res, next) {
    console.log("new request", req.path, req.ip);
    next();
})



loadRoutes(MainApp);

MainApp.listen(PORT)
