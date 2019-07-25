const mongoose = require('mongoose');

var allNoteSchema = new mongoose.Schema({
    id:{
        type:String
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

mongoose.model('allNotes',allNoteSchema);