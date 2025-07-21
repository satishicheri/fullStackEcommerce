const mongoose=require('mongoose')

 module.exports=async function connect(){     //async because untill complete the connection next task will not execute
    try{
      await mongoose.connect('mongodb://localhost:27017/ecommerce');
      console.log('database connected..');
        //it will take connection string
    }catch(error){
        console.log('error comes while connecting to database');
        
    }
} 