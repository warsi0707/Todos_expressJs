const express = require("express")
const app = express()
const path = require("path")

const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

var methodOverride = require('method-override')
app.use(methodOverride('_method'))


app.use(express.urlencoded({extended:true}));
let todos = [
    {
        id : uuidv4(),
        name : "samir",
        heading : "To write",
        content : "Write your poem urgently",
    },
    {
        id : uuidv4(),
        name : "warsi",
        heading : "To read",
        content : "Book reading is the best habit",
    },
    {
        id : uuidv4(),
        name : "siddiqui",
        heading : "To play",
        content : "Outdoor play is very important to stay fit",
    },
    {
        id : uuidv4(),
        name : "siddiqui",
        heading : "To play",
        content : "Outdoor play is very important to stay fit",
    },
    
]


app.get("/", (req, res) =>{
    res.render("index.ejs", {todos})
})

//Create Route
app.get("/new", (req, res) =>{
    res.render("new.ejs")
})
app.post("/" ,(req,res) =>{
    let {name, heading, content} = req.body;
    let id = uuidv4()
    todos.push({id, name, heading, content})
    res.redirect("/")
})

//Edit route
app.get("/:id/edit", (req, res) => {
    let {id} = req.params;
    let todo = todos.find((todo) => id === todo.id)
    res.render("edit.ejs",{todo})
})

app.patch("/:id",(req, res) =>{
    let {id} =req.params;
    let newContent = req.body.content
    let todo = todos.find((todo) => id === todo.id)
    todo.content = newContent
    console.log(todo)
    res.redirect("/")
})

//Delete route
app.delete("/:id", (req, res) =>{
    let {id} = req.params;
    todos = todos.filter((todo) => id !== todo.id)
    console.log(todos)
    res.redirect("/")
})

app.listen(8080, () =>{
    console.log("Server working on port 8080")
})