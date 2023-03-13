const {loginUser,registerNewUser} = require("./authService");


async function loginController(req, res) {

    let {email, password} = req.body;
    console.log(req.body)
    if (!email || !password)
        return res.status(400).json({message: " missing username or password"})

    try {
        let user = await loginUser(email, password)
        return res.json(user)
    } catch (e) {
        return res.status(400).json({message: e.message})
    }


}

async function signUpController(req, res) {
    let {email, password,first_name,last_name} = req.body;

    if (!email || !password)
        return res.status(400).json({message: " missing username or password"})

    try {
        await registerNewUser(email, password,first_name,last_name)
    } catch (e) {
        return res.status(400).json({message: e.message})
    }

    return res.json({message: "user created successfully"});

}


module.exports = {
    signUpController, loginController
}
