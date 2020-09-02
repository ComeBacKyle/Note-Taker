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


//This should post notes to the DB
app.post("/api/notes", function (req, res) {
    //adds current note to data
    data.push(req.body);

    let dataJSON = JSON.stringify(data);

    //writes data to db.JSON file
    fs.writeFile("./db/db.json", dataJSON, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
    res.json(true);
});


//This should be used to delete notes
app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id;
    for (i = 0; i < data.length; i++) {
        if (data[i].title.replace(/\s/g, "") == id) {
            data.splice(i, 1);
            break;
        }
    }
    // stringify the data
    let dataJSON = JSON.stringify(data);
    //write back to DB file
    fs.writeFile("./db/db.json", dataJSON, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
    res.json(data);
});