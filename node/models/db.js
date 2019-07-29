const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blueNoteDB', {useNewUrlParser:true},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connection successfully established!");
    }

})

require('./itemModel.js');