const mongoose = require('mongoose');
const item = require('./itemModel.js');

var listSchema = new mongoose.Schema({
    listId:{
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
    itemArray:[],
    categoryId:String

});

module.exports=mongoose.model('allLists',listSchema);