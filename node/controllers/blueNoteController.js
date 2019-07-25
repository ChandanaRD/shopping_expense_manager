const express = require('express');
var router = express.Router();
const BodyParser = require('body-parser');
var mongoose = require('mongoose');
var note = require('../models/blueNote.model.js');

var app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended:true }));

mongoose.connect('mongodb://localhost:27017/blueNoteDB', {useNewUrlParser:true},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connection successfully established!");
    }

})


// const mongoose = require('mongoose');

app.post("/create", async (request, response) => {
    try {
        var note = new user(request.body);
        var result = await note.save();
        response.send(result);
        console.log("note added")
    } catch (error) {
        console.log("error creating user!!");
        response.status(500).send(error);
    }
});

router.get('/',(req, res)=>{
    // note.find(function (err, products) {
    //     if (err) return console.log(err);
    //     res.json(products);
    // })
    res.json('check')
})

router.get('/all', (req, res )=> {
    note.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });

module.exports = router;