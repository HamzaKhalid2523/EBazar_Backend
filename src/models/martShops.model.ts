import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MartShops = new Schema({
    companyName: String,
    companyAddress: String,
    companyDocs: [Array],
    companyLogo: String,
    created_by: String,
    created_by_role: String,
    shopExists: String,
    isVerified: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    seller: { type: mongoose.Schema.ObjectId, ref: 'Seller' }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

MartShops.plugin(mongoosePaginate);

module.exports = mongoose.model("MartShops", MartShops);

