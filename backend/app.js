const express = require("express");
const postsRoutes=require("./routes/post")
const app = express();
app.use(express.json());


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "*")


    if(req.method==='OPTIONS'){
        return res.sendStatus(204);
    }
    next();
})

app.use(postsRoutes);


app.listen(8080);