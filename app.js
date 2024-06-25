const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./routes/user");
const  Product  = require('./routes/product');
const  Category  = require('./routes/category');

app.use(express.json());
app.use("/category",Category);
app.use("/product",Product)
app.use("/user",User);

( async() => {

    try{
        await mongoose.connect("mongodb+srv://Tolunays:124578963@cluster0.6ddows8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Mongo Dp Start")
    }

    catch(err){
        console.log(err)
    }

})()

app.listen(5001,() => {
    console.log("Start Api")
})