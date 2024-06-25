const express = require("express");
const rout = express.Router();
const { Category } = require("../model/category");


rout.get('/', async (req,res) => {
    const category = await Category.find().select('-__v').populate("product","name price -_id");
    res.send(category);
})

rout.get('/:id',async(req,res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
       return res.status(404).send("Aradığınız Kategori yok")
    }

    res.send(category);
})

rout.post("/",async (req,res) => {
    const category = new Category({
        categoryName:req.body.categoryName,
        product:req.body.product,
        
    });

    const AddCategory = await category.save();
    res.send(AddCategory);
})

rout.put("/:id",async (req,res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(404).send("Aradığınız Kategori yok")
    }
    category.categoryName = req.body.categoryName;

    const uptCategory = await category.save();
    res.send(uptCategory);
})

module.exports = rout;