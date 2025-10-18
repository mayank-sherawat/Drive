const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'must be 3 characters']
    },


    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [8, 'must be 8 characters']
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, 'must be 3 characters']
    }


})

const user= mongoose.model('user',userSchema)

module.exports = user

