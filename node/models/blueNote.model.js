const mongoose = require('mongoose');

var allNoteSchema = new mongoose.Schema({
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
    }
});

module.exports=mongoose.model('allNotes',allNoteSchema);