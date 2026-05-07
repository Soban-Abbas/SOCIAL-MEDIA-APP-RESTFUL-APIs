const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const postsRoutes = require("./routes/post")
const app = express();
const {root}=require('./util/rootpath')
const path=require("path")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log(root)

app.use(express.static(`${root}/public`));
app.use('/images',express.static(`${root}/images`));
//handling cross origin req seting header methods and headers which we accept with req , hanlding optional method 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "*")

    //send auto by browser 
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);//only sending success signal
    }
    next();
})

app.use(postsRoutes);










//global error handling middlewere
app.use((err, req, res, next) => {
    const status=error.status || 500;
    const message=error.message;
    console.log(err.stack)

    res.status(status).json({
        success: false,
        message: err.message || "Internal server error"
    })
})

// db connection link
const MonogoDbClustorUrl = `mongodb+srv://${process.env.userName}:${process.env.password}@cluster0.jvimlwf.mongodb.net/${process.env.databaseName}?retryWrites=true&w=majority`;


//Db Conection function 
async function main() {
    try {


        const connected = await mongoose.connect(MonogoDbClustorUrl);
        app.listen(8080);
        console.log("connected to Db and server Started ")


    } catch (error) {
        console.log(error)
    }

}
//calling db connection function
main()

