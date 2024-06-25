const express = require("express");
const { User } = require("../model/user");
const rout = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


rout.get('/',async (req,res) => {
    const users = await User.find();

    res.send(users);
})

rout.post('/',async (req,res) => {
    const users = await User.findOne({email:req.body.email})
    if(users){
      return  res.status(400).send("Bu Email Zaten Mevcut")
    }

    const passwordHashed = await bcrypt.hash(req.body.password,10);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:passwordHashed
    })

    await user.save();
    const token = user.createAuthToken();
    res.header("x-Token-aout",token).send(user);
})


rout.post('/auth',async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
       return res.status(400).send("Hatalı email ya da Parola")
    }
    
    const isSucces = await bcrypt.compare(req.body.password,user.password)
    if(!isSucces){
       return res.status(400).send("Hatalı email ya da Parola")
    }

    const token = user.createAuthToken();
    res.send(token);
})




module.exports = rout;