const productmodel=require('../model/productmodel');
const usermodel=require('../model/usermodel');

const createproduct=async(req,res)=>{
    try{
        const userid=req.params.userid;
        const {productname,price,category,description,image,stock_availabele}=req.body;
        if(!userid || !productname||!price||!category||!description||!image||!stock_availabele){
           
            return res.status(400).json({error:'all feilds are required'})
           
        }

        let user=await usermodel.findById(userid)
        if(!user){
            return res.status(400).json({error:'user not found'})
        }

        if(user.isadmin!==true){
            return res.status(400).json({error:'user is not admin'})
        }
        let newproduct=new productmodel(req.body) //creating newproduct object and fetching data from the req.body ,by using object name we save data
        await newproduct.save();
        return res.status(200).json({message:'product craeted successfully',product:newproduct})
    }catch(error){
        console.log(error);
        
        return res.status(500).json({error:'internal server error'})
         
    }
}

const getproduct=async(req,res)=>{
    try{
        let products=await productmodel.find();
        return res.status(200).json({message:'product succerssfully fetched',products:products})
    }catch(error){
        console.log(error);
        
        return res.status(500).json({error:'internal server error'})
    }
}

module.exports={createproduct,getproduct}