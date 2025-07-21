const express=require('express')
const router=express.Router();

const{createproduct,getproduct }=require('../controller/productcontroller');


router.post('/createproduct/:userid',createproduct)
router.get('/getproduct',getproduct)
module.exports=router