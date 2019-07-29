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
        await note.collection.insertMany(req.body, async function (err, result) {
            if (err) {
                console.log(err);
                res.statusMessage="1 or more docs have duplicate IDs";
                res.status(211).send(err);
            } else if(result){
                var list = await note.find().exec();
                console.log(list);
                res.status(200).send(list);
            }
        });
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
    try{
        note.find(filter, async function (err,resNote){
            if(err){
                console.log("err\n"+err);
                res.statusMessage="Unkonwn";
                res.status(212).send(err);
            }else if (resNote.length!=0){
                await note.update(filter,update, async function(err,result){
                    if (err) {
                        console.log("update document error:\n"+err);
                        res.status(205).send(err);
                    } else if(result){
                        console.log(result);
                        var list = await note.find().exec();
                        console.log(list);
                        res.status(200).send(list);
                    }
                })
            }else{
                res.statusMessage = "1 or more id(s) not found";
                res.status(210).end();
            }
        });     
    }catch(err){
        res.status(500).send(err);
        console.log(err);
    }
})

router.delete("/deleteNote", async (req, res)=>{
    //reqURL : http://localhost:3001/allNotes/deleteNote
    // req.body : ["n1","n2","n3"] or ["n1"]
    console.log(req.body);
    var filter={'id':{$in:req.body.ids}}
    try{
        var result = await note.deleteMany(filter).exec();
        if(result.ok == 1 && result.n == 0){
            console.log(result);
            res.statusMessage = "1 or more id(s) not found";
            res.status(210).end();
        }else if(result.ok == 1  && result.n > 0){
            var list = await note.find().exec();
            console.log(list);
            res.status(200).send(list);
        }
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = router;