const {getUsers, CreateNewUser,Find, getUserById} = require("./DB");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: jwtDecode } = require("jwt-decode");
const secret = 'sjdfisudfisdyfo';


async function isUserNameExists(email) {
    let users = await getUsers();
    let result = users.filter(u => u.email === email);

    return result.length > 0
}
async function getUser(email) {
    return (await getUsers()).filter(u => u.email === email )[0];
}

async function GenToken(user) {
    let {email, _id} = user


    return new Promise((resolve, reject) => {
        jwt.sign({email, _id}, secret, function (err, result) {
            if (err) return reject(err);
            resolve(result)
        });
        
    });
}

async function authorizeToken(token){
   let payload =  jwt.decode(token);
   console.log(payload);
   if(payload == null) return false;
   else{
   let {email, _id} = payload;
    // let users = await getUsers();
     console.log(_id);
    result = await getUserById(_id);
    console.log(result);
    if (result) return true ;
    else return false; 
   }
}
async function loginUser(email, password) {
    // check is user exist
    let result = await isUserNameExists(email);
    if (!result) {
        throw new Error("User doest not exist")
    }

    let user = await getUser(email)
    console.log(user);
    // validate password

    // create token
    console.log(user.password, password)
    let PasswordMatched = await bcrypt.compare(password, user.password)

    if (!PasswordMatched)
        throw new Error("error in username or password")
    // edit userObject

    let string = await GenToken(user)

    // return user
    user.token = string;
    return user;
}






async function registerNewUser(email, password,first_name,last_name) {
    // check if username already exists
    let result = await isUserNameExists(email);
    if (result) {
        throw new Error("User Already exists")
    }

    password = await bcrypt.hash(password, 10);
    
    
    await CreateNewUser({
     email,
     password,
     first_name,
     last_name
    })

}


module.exports = {loginUser,registerNewUser,authorizeToken};