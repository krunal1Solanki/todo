const PORT = process.env.PORT || 3300;
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://krunal:idkmypassword1%40A@cluster0.za1dsrh.mongodb.net/todolistDB")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

let dataItems = [];
const schema = mongoose.Schema({
    name : String
})

const task = mongoose.model("item", schema);

const t1 = new task({
    name : "clean all the shit"
})
const t2 = new task({
    name : "clean all the mess"
})
const t3 = new task({
    name : "clean all the poo"
})

defaultItem = [];

task.insertMany(defaultItem, function(arr) {
    if(arr) {
        console.log("Whoopsy !!")
    } else {
        console.log("There u go")
    }
})

app.get("/", function (req, res) {
    var data = new Date();
    var currDay = data.getDay();
    var arr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    day = arr[currDay];
    res.render("list.ejs", {kindOfDay: day, newItems : defaultItem});
})

app.post("/", function(req, res) {
    const newTask = new task({
        name : req.body.name
    })
    newTask.save();
    defaultItem.push(newTask);
    res.redirect("/");
})


app.get("/:customList", function(req, res) {
    const customListName = req.params.customList;

})


app.post("/delete", function(req, res){
    const delID = req.body.del;
    defaultItem = defaultItem.filter(function(it) {
        return it._id != delID;
    })
    task.findByIdAndRemove(delID, function(err) {
        if(err) {
            console.log("Whoops")

        } else {
            console.log("Done  Boss")
            res.redirect("/")

        }
    });
    
})

app.listen(PORT, function(){
    console.log("WORKABLE")
})