const mongoose=require('mongoose');

const cartschema=new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:'users'},// linking with other model
    productid:{type:mongoose.Schema.Types.ObjectId,ref:'products'},
    quantity:{type:Number,required:true},
    createAt:{type:Date,default:Date.now},
    updateAt:{type:Date,default:Date.now}
    


})

module.exports=mongoose.model('carts',cartschema)
