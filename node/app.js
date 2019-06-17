const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended:true }));

// app.post("/person", async (request, response) => {});
// app.get("/people", async (request, response) => {});
// app.get("/person/:id", async (request, response) => {});
// app.put("/person/:id", async (request, response) => {});
// app.delete("/person/:id", async (request, response) => {});

Mongoose.connect("mongodb://localhost/Profiles");

const user = Mongoose.model("Users", {
    UserName: String,
    Password: String
});

app.post("/create", async (request, response) => {
    try {
        var person = new user(request.body);
        var result = await person.save();
        response.send(result);
        console.log("user created")
    } catch (error) {
        console.log("error creating user!!");
        response.status(500).send(error);
    }
});

app.get("/allUsers", async (request, response) => {
    try {
        var result = await user.find().exec();
        response.send(result);
        console.log("all users fetched")
    } catch (error) {
        response.status(500).send(error);
        console.log("error feting all users!");
    }
});

app.get("/person/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        response.send(person);
        console.log("user found");
    } catch (error) {
        response.status(500).send(error);
        console.log("user not found!!");

    }
});

app.put("/person/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/person/:id", async (request, response) => {
    try {
        var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3010, () =>{
    console.log("listening at 3010...");
})