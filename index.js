const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const path = require("path");

const app = express();
const PORT = 8000;

mongoose
.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=> console.log("MongoDB connected"));

//models
const Blog = require("./models/blog");

//routes
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

app.use(express.static(path.resolve("./public"))); // telling express that eveything in public folder can be shared statically 
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(cookieParser());

app.use(checkForAuthenticationCookie("token")); // custom middlware for auth services
//we are making token named cookie that's why we send it


app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); 

app.get("/", async (req, res)=>{
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user, // this req.user created by middleware services
        blogs: allBlogs
    });
})

app.use("/user", userRoute); 

app.use("/blog", blogRoute);


app.listen(PORT, ()=> console.log(`Server started at ${PORT}`));