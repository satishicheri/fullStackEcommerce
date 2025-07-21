const usermodel = require('../model/usermodel')
const bcrypt=require('bcryptjs') // To secure password in the data base

 const registeruser = async (req, res) => {
    try {

        let { username, email, password } = req.body;  //we are fetching from the reqbody
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'user name ,email,password required compulsory' })
        }

        let user = await usermodel.findOne({ email }); //await waits and find email,when find then execute next
        if (user) {
            return res.status(400).json({ error: 'user aleardy exist try new user' })
        }

        req.body.password=await bcrypt.hash(password,10) //salt

        let newuser=new usermodel(req.body)
        await newuser.save() // it creates a new data or record in the database

        res.status(200).json({message:"user registered succesfully",user:newuser})

        
    } catch (error) {

        res.status(500).json({ error: "Internal server error" })

    }
}


const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){

            return res.status(400).json({error:'email,password are required'})
        }
        let user=await usermodel.findOne({email})

        if(!user){
            return res.status(400).json({error:'user is not found'});
        }

        const ismatch=await bcrypt.compare(password,user.password)

        if(!ismatch){
            return res.status(400).json({error:'password not matching'});
        }
        return res.status(200).json({message:'login succesfully done',user:user})

    }catch(error){
        res.status(500).json({error:'internal server error'})
    }
}

const getusers=async(req,res)=>{
    try{
        const users=await usermodel.find().select('-password');
        return res.status(200).json({message:'user succesfully fetched data',users:users});

    }catch(error){
        res.status(500).json({error:'internal server'})
    }
}

const getuserbyemail=async(req,res)=>{
    try{
        const email=req.params.email;  // accessing value from the params
        if(!email){
            return res.status(400).json({error:'email is required'})
        }

        const user=await usermodel.findOne({email}).select('-password') // finding the one email from the user model
        if(!user){
            return res.status(400).json({error:'user not found'})
        }
        return res.status(200).json({message:'user fetched',user:user})

    }catch(error){
        return res.status(500).json({error:'internal server error',error:error});
    }


}

const updateuser=async(req,res)=>{    //update user
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({error:'id is required'})
        }
        const updateuser=await  usermodel.findByIdAndUpdate(id,req.body,{new:true})
        if(!updateuser){
            return res.status(404).json({error:'user not found,..update failed'})
        }return res.status(200).json({message:'user update successfully',user:updateuser})

    }catch(error){
        return res.status(400).json({error:'internal server error',eror:error})
    }

    
}

const deleteuser=async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            res.status(400).json({error:'id is required'})
        }

        const deleteduser=await usermodel.findByIdAndDelete(id);
        if(!deleteduser){
            return res.status(404).json({error:'user not found'})
        }
        return res.status(200).json({message:'user deleted successfully',user:deleteduser})

    }catch(error){
        res.status(500).json({error:'internal server error'})
    }
}

module.exports = { registeruser,login,getusers,getuserbyemail,updateuser,deleteuser}