import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Order = new Schema({
    priceTotal: Number,
    quantityTotal: Number,
    orderItem: [{ type: mongoose.Schema.ObjectId, ref: 'OrderItem' }],
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    created_by: String,
    created_by_role: String,
    orderStatus: {type: String, default: 'Pending'},
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

Order.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", Order);

