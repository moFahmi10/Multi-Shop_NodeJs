const { json } = require("body-parser");
const { prod, re } = require("mathjs");


//************************MongoDB****************** */
const mongo  = require("mongodb");
const ObjectID = require('mongodb').ObjectID ;


function Connect(){
    return new Promise((resolve ,reject)=>{
        mongo.MongoClient.connect("mongodb://localhost:27017", function(err,connection){
        if (err)
            reject(err);
        resolve({db: connection, dbo : connection.db("Multi-Shop")});
        });
    });
}




function Insert(collectionName,data){
    return new Promise((resolve,reject)=>{
        Connect().then( (connection)=>{
            connection.dbo.collection(collectionName).insertOne(data,function(err,result){
                if (err) return reject(err);
                connection.db.close();})
            });
    })
    
}

 function Find(collectionName,query={}){
    return new Promise((resolve,reject)=>{
        Connect().then( (connection)=>{
            connection.dbo.collection(collectionName).find(query).toArray(function(err,result){
                if (err) return reject(err);
            
                resolve(result);
                connection.db.close();
                
            })
            });
    })
    
}

//*****************************Users******************************//
async function getUsers() {
    let users = await Find("users")
    return users;
}
async function getUserById(_id){
    let user = await Find("users",{_id :  mongo.ObjectId(_id)})
    return user;
}
async function SaveUser(user) {
    await Insert("users", user);
    return
}


async function CreateNewUser(user) {

     SaveUser(user)

    return user;
}

// async function DeleteUser(_id) {
//     let users = await getUsers();

//     let index = users.findIndex((user) => user._id == _id);
//     if (index === -1)
//         throw new Error("user not found");

//     users.splice(index, 1);
//     await write("users.json", JSON.stringify(users));
// }



//************************Products************************//
async function saveProduct(product){
     await Insert("products",product);
}

async function getProducts(){
    let products = await Find("products");
    return products;
}
async function getProduct(id){
    console.log(id);
   
    return await Find("products",{_id :  mongo.ObjectId(id)});
}

async function addNewProductDB(product){
    let products = await getProducts();

 
    saveProduct(product);
    return product;

}

async function getFeaturedProductsDB(){
    let products = await getProducts();
    let featuedProducts = products.filter(prd => prd.is_featured === true);
    return featuedProducts;
}
async function getRecentProductsDB(){
    let products = await getProducts();
    let recentProducts = products.filter(prd => prd.is_recent === true);
    return recentProducts;
}
async function getProdByIdDB(_id){
    let prod = await getProduct(_id);
    
    return prod[0];
}
async function getProdByCatIdDB(_id){
    let prods = await Find("products",{category_id:_id});
    
    return prods;
}

async function saveCategory(category){
    await Insert("categories",category);
}
async function addNewCategoryDB(category){
    console.log(category)
    saveCategory(category);
    return category;
}
async function getCategories(){
    let categories = await Find("categories");
    return categories;
}

async function getOrders(){
   return await Find("orders");
}
async function addNewOrderDB(order){
 
    await Insert("orders",order);
    return order;
}

module.exports = {
    getUsers,getUserById, SaveUser, CreateNewUser,  addNewProductDB,getProducts,getFeaturedProductsDB,getRecentProductsDB,getProdByIdDB,getProdByCatIdDB,addNewCategoryDB,getCategories,addNewOrderDB,Find
}
