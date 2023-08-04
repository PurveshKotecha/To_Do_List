//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

//console.log(date());

const app = express();

let items = [];
let workitems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems:items});
});

app.post("/", function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workitems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        //console.log(item);
        res.redirect("/");
    }
    
    
});

app.get("/work",function(req,res){
    res.render("list", {listTitle:"Work List", newListItems: workitems});
});

app.get("/about",function(req,res){
    res.render("about");
});

// app.post("/work",function(req,res){
//     let item = req.body.newItem;
//     workitems.push(item);
//     res.redirect("/work");
// });

app.listen(3000, function(){
    console.log("server is runninig");
});

