const mongoose = require('mongoose');

const quote = new mongoose.Schema({
  name: String,
  email: String,
  product: String,
  quantity: Number
}, {collection:"quotes"});

const user = new mongoose.Schema({
  username: String,
  password: String
},{collection:"users"});

exports.quoteDB = mongoose.model('quotes',quote);
exports.userDB = mongoose.model('users',user);