const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    tel: String,
    img: String,
    address: String,
    age: String,
    sex: String,
    BirthDate: String,
    
}, {
    timestamps: true
});

module.exports = model('User', userSchema, 'users');