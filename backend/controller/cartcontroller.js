const cartmodel=require('../model/cartmodel')
const usermodel=require('../model/usermodel')
const productmodel=require('../model/productmodel');


const addtocart=async(req,res)=>{
    try{
        let userid=req.params.userid;
        let productid=req.params.productid;
        let quantity=req.params.quantity || 1;

        if(!userid ||!productid){
            return res.status(400),json({error:'uerid and product is required'})
        }

        let user=await usermodel.findById(userid);
        if(!user){
            return res.status(404).json({error:'user not found'})
        }

        let product=await productmodel.findById(productid);
        if(!product){
            return res.status(404).json({error:'product not found'})
        }

        let newcart=new cartmodel({userid,productid,quantity})
        await newcart.save();

        return res.status(200).json({message:'cart created succesfully',newcart:newcart})

        
    }catch(error){
        console.log(error);
        
        return res.status(500).json({error:'internal server error'})
    }
}

const getcartsofuser=async(req,res)=>{
    try{
        let userid=req.params.userid;

        if(!userid){
            return res.status(400).json({error:'user id required'})
        }

        let user=await usermodel.findById(userid);

        if(!user){
            return res.status(400).json({error:'user not found'})
        }

        let cart=await cartmodel.find({userid}).populate('userid', '-password').populate('productid');
        if(!cart){
            return res.status(400).json({error:'cart not found'})
        }
        return res.status(200).json({message:'cart fetched successfully',cart:cart})



    }catch(error){
        console.log(error);
        
        return res.status(500).json({error:'internal serever error'})
    }
}

const updatecart=async(req,res)=>{
    try{
        const cartid=req.params.cartid;
        const quantity=req.params.quantity ||1;
        if(!cartid){
            return res.status(400).json({error:'cart required'})
        }

        let updatecart=await  cartmodel.findByIdAndUpdate(cartid,{quantity})
        if(!updatecart){
            return res.status(400).json({error:'cart is not found '})
        }
        return res.status(200).json({message:'cart updated succesfully',update:updatecart})
    }catch(error){
        return res.status(500).json({error:'internal server'})
    }
}

const deletecart=async(req,res)=>{
    try{
        let cartid=req.params.cartid;
        if(!cartid){
            return res.status(400).json({error:'cart id required'})
        }

        const deletedcart=await cartmodel.findByIdAndDelete(cartid);
        if(!deletedcart){
            return res.status(400).json({error:'cart is not found'})
        }
        return res.status(200).json({error:' cart deleted succesfully',dele:deletedcart})

    }catch(error){
        return res.status(500).json({error:'internal server'})
    }
}
module.exports={addtocart,getcartsofuser,updatecart,deletecart}