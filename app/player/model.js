const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 2;

let playerSchema = mongoose.Schema({
    email : {
        type : String , 
        require : [true , 'Email harus diisi']
    },
    name :{
        type : String,
        require : [true , 'Nama harus diisi'],
    },
    username :{
        type : String,
        require : [true , 'Nama harus diisi']
    },  
    status :{
        type : String,
        enum : ['Y' , 'N'],
        default : 'Y'
    },     
    password :{
        type : String,
        require : [true , 'password harus diisi'],
        minLength : [ 5 , 'password minimal 5 karakter']
    },
    role :{
        type : String,
        enum : ['admin' , 'user'],
        default : 'user'
    },
    avatar : {type : String},
    fileName : {type : String},    
    phoneNumber : {
        type : Number ,
        require : [true , 'no Hp harus diisi'],
        minLength : [8,"panjang nomor telepon antara 8-13 karakter"]
    },
    favorite : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    }
    
}, {timestamps : true});

playerSchema.path('email').validate(async function (value) {
    try {
        const count = await this.model('Player').countDocuments({email : value})
        return !count;
    } catch (err) {
        throw err
    }
} , attr => `${attr.value} sudah terdaftar` )

playerSchema.pre('save' , function(next) {
    this.password = bcrypt.hashSync(this.password , HASH_ROUND) 
    next()
});

module.exports = mongoose.model('Player',playerSchema);