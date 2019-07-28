const Express = require('express');
const BodyParser = require('body-parser');
var mongoose = require('mongoose');
var note = require('../models/blueNote.model.js');
var router = Express.Router({mergeParams:true});

router.get('/', (req, res)=>{
    res.send("Hey! welcome!")
});

router.get('/getAll',async (req, res)=>{
    try{
        var result = await note.find().exec();
        res.send(result);
    }catch(err){
        res.status(500).send(err);
        console.log('error fetching data');
    }
});

router.post('/addOne',async (req,res)=>{
    try{
        var newNote= new note(req.body);
        var result = newNote.save(function (err) {
            if (err) return handleError(err);
        });
        var list = await note.find().exec();
        res.send(list);
        console.log("One document inserted!");
    }catch(err){
        res.status(500).send(err);
        console.log('could not create');
    }
});

router.post('/addMultiple',async (req,res)=>{
    try{
        var newNote= new note(req.body);
        var result = newNote.collection.insertMany(req.body,function (err) {
            if (err) return console.log(err);
        });
        var list = await note.find().exec();
        res.send(list);
        console.log(req.body.length+" documents inserted!");
    }catch(err){
        res.status(500).send(err);
        console.log('could not create');
    }
});

router.put('/editNote:id', async(req, res)=>{
    try{
        var editNote = await note.find({'id':req.params.id}).exec();
        console.log(req.params.id)
        editNote.set(req.body);
        var result = await note.save();
        result = await note.find().exec();
        console.log(result);
        res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})

router.delete("/deleteNote:id", async (req, res)=>{
    try{
        var result = await note.deleteOne({id:req.params.id}).exec();
        res.send(result);
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;