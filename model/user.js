const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userScheme = mongoose.Schema({
    name:{
        type:String,
        required:true,

    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },
    isAdmin:Boolean,
}, { timestamps: true })

userScheme.methods.createAuthToken = function(){
    const payload  = jwt.sign({_id:this._id,isAdmin:this.isAdmin},'jwt');
    console.log(payload)
    return payload;
};

const User = mongoose.model("User",userScheme);

module.exports = { User };