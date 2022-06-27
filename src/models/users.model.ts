import { NextFunction } from "express";
import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require('validator');

const Schema = mongoose.Schema;
const User = new Schema({
    username: {
        type: String,
        trim: true,
        maxlength: [30, 'Username must be less or equal then 30 characters.'],
        minlength: [3, 'Username must be more or equal then 8 characters.']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 4,
        select: false
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            default: 'male',
            message: 'Gender is either: male or female'
        }
    },
    photoAvatar: {
        type: String,
        default: 'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI='
    },
    orignalPhoto: String,
    photoAvatarExt: String,
    photoAvatarFile: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    nationality: String,
    cnic: String,
    address: String,
    dob: Date,
    created_by: String,
    created_by_role: String,
    status: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    deliverAddress: { type: mongoose.Schema.ObjectId, ref: 'Address' }
},
{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});

User.plugin(mongoosePaginate);

User.index({ username: "text" });
User.index({ "$**": "text" });

User.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

User.pre('save', async function(this: any, next: NextFunction) {
    if (this.isModified('password')) {
        const password = this.password;

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        this.password = hash;
    }
    this.username = this.username;
    next();
});

User.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

User.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ is_deleted: { $ne: true } });
    next();
});

module.exports = mongoose.model("User", User);

