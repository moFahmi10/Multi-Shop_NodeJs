
const {addNewProductDB, getProdByIdDB,getProdByCatIdDB, addNewCategoryDB, addNewOrderDB} = require("./DB")

const { authorizeToken } = require("./authService");
async function addNewProduct(product){
    let result = await addNewProductDB(product);
   if (result){
    return result
   }
   else{
    throw new Error("Product already exists");
   }
    
}
async function getProdByID(_id){
    let prod = await getProdByIdDB(_id);
    if (prod) return prod
    else  throw new Error("Product ID not found");
}
async function getProdByCatID(_id){
    let prod = await getProdByCatIdDB(_id);
    if (prod) return prod
    else  throw new Error("Product ID not found");
}

async function addNewCategory(category){
    
    let result = await addNewCategoryDB(category);
    if(result) return result;
    else throw new Error("Could not add category");

}


async function addNewOrder(order,token){
    
    let bool = await authorizeToken(token);
    console.log(bool);
    if(!bool) throw new Error("Authorization error: Token is not authorized");
    else{
    let data = await addNewOrderDB(order);
    if(data) return order;
    else throw new Error("Could not add order");
    }

    }
  
module.exports = {addNewProduct,getProdByID,getProdByCatID,addNewCategory,addNewOrder}