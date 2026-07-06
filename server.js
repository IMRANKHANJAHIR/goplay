require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const authRoutes = require("./routes/auth");

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

app.use(session({
    secret:"goplaysecret",
    resave:false,
    saveUninitialized:false
}));

app.use("/",authRoutes);

app.listen(3000,()=>{
    console.log("GoPlay running at http://localhost:3000");
});