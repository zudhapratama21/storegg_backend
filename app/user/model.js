const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email : {
        type : String , 
        require : [true , 'Email harus diisi']
    },
    name :{
        type : String,
        require : [true , 'Nama harus diisi']
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
        require : [true , 'password harus diisi']
    },
    role :{
        type : String,
        enum : ['admin' , 'user'],
        default : 'admin'
    },
    phoneNumber : {
        type : Number,
        require : [true , 'no Hp harus diisi']
    }
}, {timestamps : true});

module.exports = mongoose.model('User',userSchema);