const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name : {
        type : String , 
        require : [ true , "Kategori harus di isi" ]
    }
},{timestamps : true});

module.exports = mongoose.model('Category',categorySchema);