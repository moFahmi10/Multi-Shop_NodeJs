const { getProducts, getFeaturedProductsDB,getRecentProductsDB, getCategories } = require("./DB");
const { addNewProduct, getProdByID,getProdByCatID, addNewCategory, addNewOrder } = require("./service");



async function addProductController(req,res){
    if (!req.body)
        return res.status(400).json({message: " missing req body"});
    try{
    let product = await addNewProduct( req.body );
        return res.json(product);
    }
    catch(e){
        return res.status(400).json({message: e.message});
    }
}
async function getAllProducts(req,res){
    
    let data = await getProducts();
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

    return res.json( {data});
}
async function getFeaturedProducts(req,res){
    let data = await getFeaturedProductsDB();
   
    return res.json({data});
}
async function getRecentProducts(req,res){
    let data = await getRecentProductsDB();
   
    return res.json({data});
}
async function getProdByIDController(req,res){
    
    
  
    if (!req.query.id) res.status(400).json({message:"Missing id in req paramater"});
    else {
    let _id  = req.query.id;
    try {
    let data = await getProdByID(_id);
    return res.json({data});
    }
    catch(e){
       return res.status(400).json({message: e.message})
    }
    }

}
async function getProdByCatIDController(req,res){
    
    
  
    if (!req.query.id) res.status(400).json({message:"Missing id in req paramater"});
    else {
    let _id  = req.query.id;
    try {
    let data = await getProdByCatID(_id);
    return res.json({data});
    }
    catch(e){
       return res.status(400).json({message: e.message})
    }
    }

}

async function addCategoryController(req,res){
    
    if(!req.body) res.status(400).json({message: "Empty request body"});
    else{
        let category = req.body;
        try{
            let data = await addNewCategory(category);
            res.json(data);
        }
        catch(e){
            res.status(400).json({message:e.message});
        }
    }
}
async function getCategoriesController(req,res){
    let data = await getCategories();
    console.log(data)
    return res.json({data});
}

async function addNewOrderController(req,res){
    let token = req.query.token;
    if(!token)  return res.status(400).json({message: "Authentication error: Missing Auth. Token"})
    order = req.body;
    if(!order) return res.status(400).json({message: "Empty request body"});
    else{
        try{
           data =  await addNewOrder(order,token);
            return res.json(data,{message:"Order placed successfuly"});
        }
        catch(e){
            return res.status(400).json({message: e.message});
        }
    } 
}


module.exports = {addProductController,getAllProducts,getFeaturedProducts,getRecentProducts,getProdByIDController,
    getProdByCatIDController,addCategoryController,getCategoriesController, addNewOrderController}