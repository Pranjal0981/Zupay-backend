const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [4, "Firstname should be at least 4 characters long"]
    },
    lastName: {
        type: String,
        minlength: [4, "Firstname should be at least 4 characters long"]
    },

   email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        minlength: [4, "Password should be at least 4 characters long"],
           },
   
}, { timestamps: true });

userSchema.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const User = mongoose.model("User", userSchema);

module.exports = User;
