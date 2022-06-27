import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OrderItem = new Schema({
    price: Number,
    quantity: Number,
    product: {
        localProduct: { type: mongoose.Schema.ObjectId, ref: 'LocalProducts' },
        martProduct: { type: mongoose.Schema.ObjectId, ref: 'MartProducts' },
        productType: String
    },
    shop: {
        localShop: { type: mongoose.Schema.ObjectId, ref: 'LocalShops' },
        martShop: { type: mongoose.Schema.ObjectId, ref: 'MartShops' },
        shopType: String
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    seller: { type: mongoose.Schema.ObjectId, ref: 'Seller' },
    rating: { type: mongoose.Schema.ObjectId, ref: 'Rating' },
    orderStatus: {type: String, default: 'Pending'},
    created_by: String,
    created_by_role: String,
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

OrderItem.plugin(mongoosePaginate);

module.exports = mongoose.model("OrderItem", OrderItem);

