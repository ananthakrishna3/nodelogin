const express=require('express');
const router = express.Router();
const path=require('path');

router.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname,'../views/home.html'))
});

router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/login.html'))
})



















module.exports=router