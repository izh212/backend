const mongoose = require('mongoose');

const Employee = new mongoose.Schema(
    {
        name:String,
        email:
        {
            type:String,
            unique:true
        },
        phone:{
            type:String,
            unique:true
        }
    }
)

module.exports = mongoose.model('Employee',Employee)