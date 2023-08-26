const express = require('express');
const app = express();
const path=require('path');
app.set("view engine", "ejs");



app.use(express.static(path.join(__dirname,'static')))
app.use('/',require(path.join(__dirname,'router/page.js')))



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`This server is running on port : ${PORT}`))