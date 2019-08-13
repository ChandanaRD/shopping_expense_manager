const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    categoryId:{
        type:String, unique:true
    },
    title:{
        type:String
    },
    done:{
        type:Boolean
    },
    password:{
        type:String
    },
    desc:{
        type:String
    },
    listArray:[]

});

module.exports=mongoose.model('allCategories',categorySchema);