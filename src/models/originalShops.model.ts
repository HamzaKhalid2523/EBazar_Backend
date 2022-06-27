import { NextFunction } from "express";
import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require('validator');

const Schema = mongoose.Schema;
const OriginalShops = new Schema({
    seller: String,
    phone: String,
    email: String,
    cnic: String,
    address: String,
    companyName: String,
    companyAddress: String,
    companyDocs: [Array],
    created_by: String,
    created_by_role: String,
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

OriginalShops.plugin(mongoosePaginate);

module.exports = mongoose.model("OriginalShops", OriginalShops);

