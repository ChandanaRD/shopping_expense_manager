const Express = require('express');
const BodyParser = require('body-parser');
var mongoose = require('mongoose');
var item = require('../models/itemModel.js');
var list = require('../models/listModel.js');
var router = Express.Router({mergeParams:true});

mongoose.set('useFindAndModify', false);

router.get('/', (req, res)=>{
    res.send("Hey! welcome!")
});

router.get('/getAllLists',async (req, res)=>{
    try{
        var result = await list.find().exec();
        console.log("All lists fetched");
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(err);
        console.log('error fetching Lists');
        console.log(err);
    }
});

router.post('/addList',async (req,res)=>{
    //format => inside req.body should contain : [{"id":"n1","title":"item1","done":false,"disabled":true}]
    // can add one or more notes together
    try{
        await list.collection.insertOne(req.body, async function (err, result) {
            if (err) {
                console.log(err);
                res.statusMessage="doc has duplicate ID";
                res.status(211).send(err);
            } else if(result){
                var listArray = await list.find().exec();
                console.log(listArray);
                res.status(200).send(listArray);
            }
        });
    }catch(err){
        res.status(500).send(err);
        console.log('could not create');
    }
});

router.put('/editList:id', async(req, res)=>{
    //reqURL : http://localhost:3001/blueNotes/editListn2
    // req.body: {"id":"idVal"} or {"reqVield":"requiredVal"} one or more or all fields
    var filter = {id:req.params.id};
    var update = req.body;
    try{
        list.find(filter, async function (err,resList){
            if(err){
                console.log("err\n"+err);
                res.statusMessage="Unkonwn";
                res.status(212).send(err);
            }else if (resList.length!=0){
                await list.update(filter,update, async function(err,result){
                    if (err) {
                        console.log("update document error:\n"+err);
                        res.status(205).send(err);
                    } else if(result){
                        console.log(result);
                        var list = await list.find().exec();
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
});

router.delete("/deleteList", async (req, res)=>{
    //reqURL : http://localhost:3001/blueNotes/deleteList
    // req.body : ["n1","n2","n3"] or ["n1"]
    console.log(req.body);
    var filter={'id':{$in:req.body.ids}}
    try{
        var result = await list.deleteMany(filter).exec();
        if(result.ok == 1 && result.n == 0){
            console.log(result);
            res.statusMessage = "1 or more id(s) not found";
            res.status(210).end();
        }else if(result.ok == 1  && result.n > 0){
            var listArray = await list.find().exec();
            console.log(listArray);
            res.status(200).send(listArray);
        }
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

router.get('/getItems',async (req, res)=>{
    try{
        var result = await item.find().exec();
        console.log("All notes fetched");
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(err);
        console.log('error fetching data');
        console.log(err);
    }
});

router.post('/addItem',async (req,res)=>{
    //format => inside req.body should contain : [{"id":"n1","title":"item1","done":false,"disabled":true}]
    // can add one or more notes together
    try{
        await item.collection.insertMany(req.body, async function (err, result) {
            if (err) {
                console.log(err);
                res.statusMessage="1 or more docs have duplicate IDs";
                res.status(211).send(err);
            } else if(result){
                var list = await item.find().exec();
                console.log(list);
                res.status(200).send(list);
            }
        });
    }catch(err){
        res.status(500).send(err);
        console.log('could not create');
    }
});

router.put('/editItem:id', async(req, res)=>{
    //reqURL : http://localhost:3001/blueNotes/editItemn2
    // req.body: {"id":"idVal"} or {"reqVield":"requiredVal"} one or more or all fields
    var filter = {id:req.params.id};
    var update = req.body;
    try{
        item.find(filter, async function (err,resNote){
            if(err){
                console.log("err\n"+err);
                res.statusMessage="Unkonwn";
                res.status(212).send(err);
            }else if (resNote.length!=0){
                await item.update(filter,update, async function(err,result){
                    if (err) {
                        console.log("update document error:\n"+err);
                        res.status(205).send(err);
                    } else if(result){
                        console.log(result);
                        var list = await item.find().exec();
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

router.delete("/deleteItem", async (req, res)=>{
    //reqURL : http://localhost:3001/blueNotes/deleteItem
    // req.body : ["n1","n2","n3"] or ["n1"]
    console.log(req.body);
    var filter={'id':{$in:req.body.ids}}
    try{
        var result = await item.deleteMany(filter).exec();
        if(result.ok == 1 && result.n == 0){
            console.log(result);
            res.statusMessage = "1 or more id(s) not found";
            res.status(210).end();
        }else if(result.ok == 1  && result.n > 0){
            var list = await item.find().exec();
            console.log(list);
            res.status(200).send(list);
        }
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = router;