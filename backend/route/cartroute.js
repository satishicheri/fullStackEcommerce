const express=require('express');
const { addtocart, getcartsofuser, updatecart, deletecart } = require('../controller/cartcontroller');
const router=express.Router();

router.post('/addtocart/:userid/:productid/:quantity',addtocart)
router.get('/getsofuser/:userid',getcartsofuser)
router.patch('/updatecart/:cartid/:quantity',updatecart)
router.delete('/deletecart/:cartid',deletecart)
module.exports=router