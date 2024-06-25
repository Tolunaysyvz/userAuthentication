const {mongoose , Schema} = require("mongoose");



const categorySchema = mongoose.Schema({
    categoryName:String,
    Date:{
        type:Date,
        default:Date.now,
    },

    product:{ type:Schema.Types.ObjectId, ref:"Product" },
});


const Category = mongoose.model("Category",categorySchema);

module.exports = { Category };