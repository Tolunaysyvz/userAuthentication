const express = require("express");
const rout = express.Router();
const {Product,comment} = require("../model/product");
const auth = require("../middware/auth");
const isAdmin = require("../middware/isAdmin");
rout.get('/',async (req,res) => {
    const product = await Product.find().select('-__v').populate("category", ' categoryName -_id ');
    res.send(product);
})

rout.get('/:id',async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
      return  res.status(404).send("Aradığınız Ürün yok")
    }

    res.send(product);
})

rout.post('/', [auth,isAdmin] ,async (req,res) => {

    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        desprication:req.body.desprication,
        isActive:req.body.isActive,
        category:req.body.category,
        other:req.body.other,
    });
    
    const Products = await product.save();
    res.send(Products);
})

rout.put('/:id',async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return  res.status(404).send("Aradığınız Ürün yok")
    }
    
    product.name = req.body.name;
    product.price = req.body.price;
    product.desprication = req.body.desprication;
    product.isActive = req.body.isActive;
    product.category = req.body.category;
    product.other = req.body.other;

    const Uptproduct = await product.save();
    res.send(Uptproduct);
})


rout.put('/comment/:id',async (req,res) => {

    const product = await Product.findById(req.params.id);
    if(!product){
        return  res.status(404).send("Aradığınız Ürün yok")
    }
    
    const uptadeComments = new comment({
        name:req.body.name,
        comment:req.body.comment,
    });

    product.other.push(uptadeComments);

    const newsProduct = await product.save();

    res.send(newsProduct);


})

rout.delete('/comment/:id',async (req,res) => {

    const product = await Product.findById(req.params.id);
    if(!product){
        return  res.status(404).send("Aradığınız Ürün yok")
    }

    const productDelete = product.other.id(req.body.commentid);

    productDelete.remove();

    const upt = await product.save();

    res.send(upt);
  


})




rout.delete('/:id',async (req,res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        return  res.status(404).send("Silinecek Ürün yok")
    }

 
    res.send(product);
})


module.exports =  rout;
