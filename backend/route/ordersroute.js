const express=require('express');
const { createorder, getallorders, getordersofuser } = require('../controller/orderscontroller');

const router=express.Router();

//endpoints
router.post('/createorder',createorder)
router.get('/getallorder',getallorders)
router.get('/getsofuserorder/:userid',getordersofuser)

module.exports=router