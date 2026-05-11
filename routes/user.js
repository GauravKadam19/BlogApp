const { Router } = require("express");

const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => { // /user/signin
    return res.render("signin");
})

router.post("/signin", async (req, res) => { // /user/signin
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        console.log(`token: ${token}`);

        return res.cookie('token', token).redirect("/");
    }
    catch(err) { // if user password is wrong or user is not available
        return res.render('signin', {
            error: "Incorrect Email or Password",
        });
    }
    


})

router.get("/signup", (req, res) => { // /user/signup
    return res.render("signup");
})

router.post("/signup", async (req, res) => {  // /user/signup
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    })

    return res.redirect("/");
})


router.get("/logout", (req, res)=> {  // /user/logout
    res.clearCookie("token").redirect("/");
}) 

module.exports = router;
