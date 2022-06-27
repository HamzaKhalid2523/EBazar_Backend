import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Products = new Schema({
    productImages: [Array],
    productCategories: [Array],
    productName: String,
    productBrand: String,
    productFeatures: [Array],
    productTags: [Array],
    shortDescription: String,
    longDescription: String,
    color: String,
    price: Number,
    weight: String,
    warrantyType: String,
    created_by: String,
    created_by_role: String,
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    shop: {
        localShop: { type: mongoose.Schema.ObjectId, ref: 'LocalShops' },
        martShop: { type: mongoose.Schema.ObjectId, ref: 'MartShops' },
        shopType: String
    }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

Products.plugin(mongoosePaginate);

module.exports = mongoose.model("Products", Products);

