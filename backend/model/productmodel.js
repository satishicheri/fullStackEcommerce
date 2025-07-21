const mongoose=require('mongoose')
const productschema=new mongoose.Schema({
    productname:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    stock_availabele:{type:Number,required:true},
     isactive:{type:Boolean},
      
       reviews:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
        rating:{type:Number,required:true},
        comment:{type:String,required:true}
       }]

})

module.exports=mongoose.model('product',productschema)