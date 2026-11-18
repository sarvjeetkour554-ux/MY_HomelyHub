//schema for the user model

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"],
            //"              sarv                  "
            trim : true,
            maxLength :[50,"your name cannot exceed 50 characters"]
        },

        email: {
            type: String,
            required: [true, "Please enter email ID"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [
                validator.isEmail,
                "Please enter a valid email address"
            ]
        },

        password: {
            type: String,
            required: [true, "Please enter password"],
            minlength: [8, "Password should be greater than 8 characters"],
            select: false   //should not be selected by default when querying the database
        },

        passwordConfirm: {      //this feild is only forvalidation purpose and will not be stored in the database
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords are not the same"
            }
        },
        phoneNumber:{
            type:String,
            required:true,   
            unique:true,
            trim:true
        },

        role: {
            type: String,
            enum: ["user", "admin"],   //only two values are allowed for this field
            default: "user"
        },
        avatar:{
            url:{type:String},
            public_id:{type:String}
        },

        passwordChangedAt:{
            type:Date

        },

        passwordResetToken:{
            type:String ,
            select :false,
            index :true

        },

        passwordResetExpires:{
            type :Date,
            select:false

        } 
    },
    {
        timestamps: true
    }
);


//setting is not to pass in response from server
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;          //ret is object that will be returned when the document is coverted to json format
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;   //mongoose version number
        return ret;
    }
});


//password login
//hashing before saving to database
/*
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next();
});
*/

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
});


//login checking
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


//
userSchema.methods.changedPasswordAfter  = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
        10);
        return JWTTimestamp < changedTimestamp;      //true means password was changed after token was issued
    }

    return false;                           //false means password was not changed after token was issued
}


//forgot password token generation
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")   //sha256 is a hashing algorithm that generates a fixed-length string from input data
        .update(resetToken)
        .digest("hex");

        this.passwordResetExpires = Date.now() + 10 * 60 * 1000;   //10 minutes
        return resetToken;   //this token will be sent to the user via email and will be used to reset the password
}


const User = mongoose.model("User", userSchema);
//in mongoose db : users
export{User};
//export default User;