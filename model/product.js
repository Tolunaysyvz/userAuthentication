const {mongoose, Schema } = require("mongoose");

const productComment = mongoose.Schema({
    name:String,
    comment:String,
    Date:{
        type:Date,
        default:Date.now,
    },
    

});

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    desprication:String,
    isActive:Boolean,
    Date:{
        type:Date,
        default:Date.now,
    },
    category:{ type:Schema.Types.ObjectId, ref:"Category" },
    other:[productComment],
});

const Product = mongoose.model("Product",productSchema);
const comment = mongoose.model("comment",productComment);

module.exports = {Product,comment};
