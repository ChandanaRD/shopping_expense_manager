const Express = require('express');
const BodyParser = require('body-parser');
var mongoose = require('mongoose');
var note = require('../models/blueNote.model.js');
var router = Express.Router({mergeParams:true});

mongoose.set('useFindAndModify', false);

router.get('/', (req, res)=>{
    res.send("Hey! welcome!")
});

router.get('/getAllNotes',async (req, res)=>{
    try{
        var result = await note.find().exec();
        console.log("All notes fetched");
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(err);
        console.log('error fetching data');
        console.log(err);
    }
});

router.post('/addNote',async (req,res)=>{
    //format => inside req.body should contain : [{"id":"n1","title":"item1","done":false,"disabled":true}]
    // can add one or more notes together
    try{
        var i=0;
        var newNote= new note(req.body);
        var error = null;
        var result = await newNote.collection.insertMany(req.body,function (err, result) {
            if (err) {
                console.log(err);
                error=err;
                console.log(err);
                res.status(210).send(err);
            } else if(result){
                console.log('no. of documents inserted: ' +req.body.length);
                res.status(200).send(result);
                console.log(result);
            }
        });
        // console.log('inserted');
    }catch(err){
        res.status(500).send(err);
        console.log('could not create');
    }
});

router.put('/editNote:id', async(req, res)=>{
    //reqURL : http://localhost:3001/allNotes/editNoten2
    // req.body: {"id":"idVal"} or {"reqVield":"requiredVal"} one or more or all fields
    var filter = {id:req.params.id};
    var update = req.body;
    var error = null;
    var docToBeUpdated=null;
    try{
        await note.findOneAndUpdate(filter,update,function(err,result){
            if (err) {
                console.log("update document error:\n"+err);
                res.status(205).send(err);
            } else if(result) {
                console.log('the following document: '+JSON.stringify(result)+' \n is updated to: '+JSON.stringify(req.body))
            res.status(200).send(result);
            }
        })
    }catch(err){
        res.status(500).send(err);
        console.log(err);
    }
})

router.delete("/deleteNote", async (req, res)=>{
    //reqURL : http://localhost:3001/allNotes/deleteNote
    // req.body : ["n1","n2","n3"] or ["n1"]
    console.log(req.body);
    var filter={'id':{$in:req.body}}
    try{
        var result = await note.deleteMany(filter).exec();
        console.log(result);
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = router;