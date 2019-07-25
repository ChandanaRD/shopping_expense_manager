require('./models/db');
const express=require('express');
const path=require('path');
const allNoteController = require('./controllers/blueNoteController.js');

var app = express();

app.listen(3008,()=>{
    console.log('node server started and listening to port 3008');
});

app.use('/allNotes', allNoteController);
