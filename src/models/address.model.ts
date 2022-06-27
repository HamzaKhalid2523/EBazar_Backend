import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Address = new Schema({
    username: String,
    phone: String,
    province: String,
    city: String,
    area: String,
    address: String,
    building: String,
    colony: String,
    addressType: String,
    created_by: String,
    created_by_role: String,
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

Address.plugin(mongoosePaginate);

module.exports = mongoose.model("Address", Address);

