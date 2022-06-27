import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MartProducts = new Schema({
    productImages: Array,
    productCategories: Array,
    productName: String,
    productBrand: String,
    productFeatures: Array,
    productTags: Array,
    shortDescription: String,
    longDescription: String,
    color: String,
    price: Number,
    weight: String,
    warrantyType: String,
    deliveryPrice: Number,
    stockQuantity: Number,
    created_by: String,
    created_by_role: String,
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    totalRating: {type: Number, default: 0},
    rating: [{ type: mongoose.Schema.ObjectId, ref: 'Rating' }],
    shop: { type: mongoose.Schema.ObjectId, ref: 'MartShops' },
    seller: { type: mongoose.Schema.ObjectId, ref: 'Seller' }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

MartProducts.plugin(mongoosePaginate);

module.exports = mongoose.model("MartProducts", MartProducts);

