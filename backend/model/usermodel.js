const mongoose = require('mongoose');
const userschema = new mongoose.Schema({   //create one schema collection ,it reflex like databse

    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: Number },
    isadmin: { type: Boolean },
    createdAt: { type: Date, defaultmodule: Date.now },
    updatedAt: { type: Date, defaultmodule: Date.now }


})

module.exports = mongoose.model('users', userschema)
//exporting this file means we create one schema ,exporting that 