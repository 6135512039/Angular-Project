const {Schema,model} = require('mongoose');

const Book = new Schema({
  name: {type: String, required: true},
  fullname: {type: String, required: true},
  description: {type: String, required: true},
  img: {type:String, required: true},
  youtubeid: {type:String, required: true},
  movieurl: {type:String, required:true}
},{
  timestamps: true
})

module.exports = model('Book', Book);
