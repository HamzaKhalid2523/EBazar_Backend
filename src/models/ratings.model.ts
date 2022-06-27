import { NextFunction } from "express";
import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require('validator');

const Schema = mongoose.Schema;
const Rating = new Schema({
    review: {
        type: String,
        maxlength: [300, "Review must be less or equal then 100 characters."],
        minlength: [5, "Review must be more or equal then 5 characters."],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Rating must be provided!"],
    },
    created_by: String,
    created_by_role: String,
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

Rating.plugin(mongoosePaginate);

module.exports = mongoose.model("Rating", Rating);

