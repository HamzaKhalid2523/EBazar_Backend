import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const LocalShops = new Schema({
    companyName: String,
    companyAddress: String,
    companyDocs: [Array],
    created_by: String,
    created_by_role: String,
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    seller: { type: mongoose.Schema.ObjectId, ref: 'Seller' }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

LocalShops.plugin(mongoosePaginate);

module.exports = mongoose.model("LocalShops", LocalShops);

