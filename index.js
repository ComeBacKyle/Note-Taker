//DEPENDENCIES
//=========================================
const express = require("express");
const fs = require("fs");
const path = require("path")


const app = express()
const PORT = 3000
//Default express app is set

//Data to be held
//=========================================


//array for the notes to be held in

const Notes =

    //This will bring the notes.html page
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "note.html"));
    });

//This will bring the index.html page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

//This will create a new note and save it to the notes array
app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err
        const note = JSON.parse(data)
        note.push(newNote)
        note.forEach((item, i) => item.id = i + 1)
        fs.writeFile("./db/db.json", JSON.stringify(note), "utf8", function (err) {
            if (err) throw err
            console.log("Posted Note")
        })
    })


    //This will display the new note in a json format
    res.json(newNote);
});

//Displays all the notes that are saved
app.get("/api/notes", function (req, res) {
    return res.json(Notes);
});
