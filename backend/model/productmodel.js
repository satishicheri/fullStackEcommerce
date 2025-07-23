const mongoose=require('mongoose') //importing mongoose

const productschema=new mongoose.Schema({  //create one schema (schema define all feilds )
    productname:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    stock_availabele:{type:Number,required:true},
     isactive:{type:Boolean},
      
       reviews:[{      // this is reviwes stored in array and inside object
        user:{type:mongoose.Schema.Types.ObjectId,ref:'users'}, //we give reference user collection
        rating:{type:Number,required:true},
        comment:{type:String,required:true}
       }]

})
                              //this product name is collection name
module.exports=mongoose.model('products',productschema) 