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
    ItemArray:[]

});

module.exports=mongoose.model('allLists',listSchema);