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

const getproductbyid=async(req,res)=>{
    try{
        let id=req.params.id;
        if(!id){
            return res.status(400).json({errro:'id required'})
        }
        
        const product=await productmodel.findById(id)
        if(!product){
            
            
            return res.status(400).json({error:'product not found'})

        }
        return res.status(200).json({message:'product fetched successfully',product:product})
    }catch(error){
        console.log(error   )
        return res.status(500).json({error:'internal server'})
    }   
}

const updateproduct=async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({error:'id is required'})
        }

        const update=await productmodel.findByIdAndUpdate(id,req.body)
        if(!update){
            return res.status(404).json({error:'product not found'})
        }
        return res.status(200).json({message:'product update successfully',update:update})

    }catch(error){
        return res.status(500).json({error:'internal server error'})
    }
}

const deletedproduct=async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({error:'id is required'})
        }

        const deleted=await productmodel.findByIdAndDelete(id)
        if(!deleted){
            return res.status(404).json({error:'product not found'})
        }
        return res.status(200).json({message:'product deleted successfully',delete:deleted})

    }catch(error){
        return res.status(500).json({error:'internal server error'})
    }
}
module.exports={createproduct,getproduct,getproductbyid,updateproduct,deletedproduct}