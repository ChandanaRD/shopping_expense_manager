const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    id:{
        type:String, unique:true
    },
    title:{
        type:String
    },
    done:{
        type:Boolean
    },
    disabled:{
        type:Boolean
    },
    listID:{
        type:String
    }
});

module.exports=mongoose.model('allitems',itemSchema);