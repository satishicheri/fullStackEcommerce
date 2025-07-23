const express=require('express')
const router=express.Router();

const{createproduct,getproduct ,getproductbyid,updateproduct,deletedproduct}=require('../controller/productcontroller');



router.post('/createproduct/:userid',createproduct)
router.get('/getproduct',getproduct)
router.get('/product/:id',getproductbyid)
router.put('/update/:id',updateproduct)
router.delete('/delete/:id',deletedproduct)
module.exports=router