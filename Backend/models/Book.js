const {Schema,model} = require('mongoose');

const Book = new Schema({
  name: {type: String, required: true},
  price: {type: String, required: true},
  description: {type: String, required: true}
},{
  timestamps: true
})

module.exports = model('Book', Book);
