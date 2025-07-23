const express=require('express');
const mongo=require('mongoose')
const connect=require('./db/connectdb')
const userroute=require('./route/userroute')
const cors=require('cors');
const productroute=require('./route/productroute')
const cartroute=require('./route/cartroute')
const orderroute=require('./route/ordersroute')

connect(); //it will connect our project to mongodb file.(calling to database connection file) 
const app=express();



app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors());

//http://localhost:4000/api/login
app.get('/api',(req,res)=>{
    res.status(200).json('server is working correctly!..')
})

app.use('/api',userroute)
app.use('/api',productroute)
app.use('/api',cartroute)
app.use('/api',orderroute)

app.listen(4000,()=>{   //.emb file
console.log('server running at port number:4000...');

})
