const express = require("express");
const path = require("path");
const fs = require("fs");
//Create unique user ID
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3001;

// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
        console.error(err)
        return
    }
    //When data is coming from a json file, we always need to parse it, so the front end can read it!
    res.json(JSON.parse(data));
    })

});

app.get('/api/notes/:id', (req, res) => {
    let pastNote = fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
        console.error(err)
        return res.json(pastNote)[Number(req.params.id)];
        }
    })    
});

// To do: post route

// Listener