require('./models/db');
const express=require('express');
const BodyParser = require("body-parser");
const path=require('path');
const blueNoteController = require('./controllers/blueNoteController.js');
const cors = require('cors');

var app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended:true }));
app.listen(3001,()=>{
    console.log('node server started and listening to port 3001');
});
app.use(cors())
app.use('/blueNotes', blueNoteController);
