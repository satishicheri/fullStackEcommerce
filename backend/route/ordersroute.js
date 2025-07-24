const express=require('express');
const router=express.Router();

const { createorder, getallorders, getorderhistoryofuser, updateorder } = require('../controller/orderscontroller');


//endpoints
router.post('/createorder',createorder)
router.get('/getallorder',getallorders)
router.get('/getsofuserorder/:userid',getorderhistoryofuser)
router.put('/updateorder/:id',updateorder)

module.exports=router