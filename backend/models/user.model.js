const mongoose = require('mongoose');

const Schema = mongoose.Schema; //structure of document

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //trim whitespace off end
        minlength: 3 //at least 3 char username
    },
}, {
    timestamps: true, //fields for when user was created and modified automatically created when this is true
});

const User = mongoose.model('User', userSchema);
//mongoose model, User is name, userschema is schema
module.exports = User;
//export schema
