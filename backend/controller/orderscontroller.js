const ordersmodel=require("../model/ordermodel")
const productmodel=require("../model/productmodel")
const usermodel=require("../model/usermodel");
const cartmodel=require("../model/cartmodel");
const ordermodel = require("../model/ordermodel");

const createorder=async(req,res)=>{
    try {
        const {userid,productid,quantity,paymentmode,shippingaddress,status}=req.body;
        if(!userid || !paymentmode || !shippingaddress || !status){
            return res.status(400).json({ error: 'userid,paymentmode,shippingaddress,deliverydate,orderdate,status are required' })
        }
        let user=await usermodel.findById(userid);
        if(!user){
            return res.status(400).json({ error: 'user not found' })
        }
        if(productid && quantity){
           let product=await productmodel.findById(productid);
           if(!product){
               return res.status(400).json({ error: 'product not found' })
           }
           if(product.stock_available>=quantity){
              let totalamount=product.price*quantity;
              let neworderobj={
                     userid:userid,
                     products:[{
                         productid:productid,
                         quantity:quantity
                     }],
                     totalamount:totalamount,
                     paymentmode:paymentmode,
                     shippingaddress:shippingaddress,
                    
                     status:status
              }
              let neworder=new ordersmodel(neworderobj);
              await neworder.save();
              return res.status(200).json({ message: "order created successfully", order: neworder })

           }else{
               return res.status(400).json({ error: 'product stock not available' })
           }  
        }else{
             let products=await cartmodel.find({userid}).populate('productid');
             let totalamount=0;
             products=products.map((product)=>{
                 totalamount+=product.productid.price*product.quantity;
                 return{
                     productid:product.productid._id,
                     quantity:product.quantity
                 }
             })
             let neworderobj={
                     userid:userid,
                     products:products,
                     totalamount:totalamount,
                     paymentmode:paymentmode,
                     shippingaddress:shippingaddress,
                     status:status
              }
              let neworder=new ordersmodel(neworderobj);
              await neworder.save();
              return res.status(200).json({ message: "order created successfully", order: neworder })
        }

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: 'internal server error' })
    }
}

const getallorders=async(req,res)=>{
    try{
        const order=await ordermodel.find()
         return res.status(200).json({ message: "get order successfully", order: order })

    }catch(error){
         return res.status(500).json({error: "internal server error"})
    }
}

const getordersofuser=async(req,res)=>{
    try{
        const userid=req.params.userid;
        if(!userid){
            return res.status(400).json({error:'user id required'})
        }

        let userorder=await usermodel.findById(userid);
        if(!userorder){
            return res.status(400).json({error:'user not found'})
        }
        const orders=await ordersmodel.find({userid}).populate('userid','-password').populate('products.productid');
        return res.status(200).json({message:'order fetched succefully',order:orders})

    }catch(error){
        console.log(error);
        
         return res.status(500).json({error:'internal server'})

    }
}
module.exports={createorder,getallorders,getordersofuser}