const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vipul:vipul123@cluster0.xhgrr7t.mongodb.net/paytm')

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
