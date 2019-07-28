const Express = require('express');
const BodyParser = require('body-parser');
var mongoose = require('mongoose');
var note = require('../models/blueNote.model.js');
var router = Express.Router({mergeParams:true});

mongoose.set('useFindAndModify', false);

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
    //format => inside req.body should contain : {"id":"n1","title":"item1","done":false,"disabled":true}
    console.log("addone");
    try{
        console.log(req.body);
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
    //format => inside req.body should contain : [{"id":"n1","title":"item1","done":false,"disabled":true}]
    try{
        var newNote= new note(req.body);
        var result = await newNote.collection.insertMany(req.body,function (err) {
            if (err) {
                console.log("could not insert document");
                res.send(err);
            }
        });
        res.send('inserted');
        console.log('inserted');
    }catch(err){
        res.status(500).send(err);
        console.log('could not create');
    }
});

router.put('/editNote:id', async(req, res)=>{
    //reqURL : http://localhost:3001/allNotes/editNoten2
    try{
        note.findOneAndUpdate({id:req.params.id},{$set: req.body},function(err,doc){
            if (err) {
                console.log("update document error");
            } else {
                console.log("update document success");
                res.send('the following document: '+JSON.stringify(doc)+' \n is updated to: '+JSON.stringify(req.body));
            }
        })
        result = await note.find().exec();
        // console.log(result);
        // res.send(result);
    }catch(err){
        res.status(500).send(err);
        console.log(err);
    }
})

router.delete("/deleteNote:id", async (req, res)=>{
    //reqURL : http://localhost:3001/allNotes/deleteNoten2
    try{
        var result = await note.deleteOne({id:req.params.id}).exec();
        res.send(result);
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;