// Server code to handle serving website and background logic
// add variables
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');

// adding port to test locally
const PORT = 3001;

// create instance of express as a variable
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(express.static('public'));

// Write get function to retreive index.html and serve
app.get('/', (req,res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// Sendfile so that the button works on the landing page to bring up notes.html
app.get('/notes', (req,res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Post notes to web page
app.get('/api/notes', (req,res) => {
  // copied from below app.post with some modifications
  fs.readFile ('./db/db.json', 'utf8', (err, data) => {
    // Handle if readFile returns an error
    if (err) {
      res.status(500).json(err);
    } else {
      //like the parsed notes from below
      res.json(JSON.parse(data));
    }
  });
})

// Post request to add note to db
app.post('/api/notes', (req,res) => {
  // Log to server terminal that a POST request was received
  console.info(`${req.method} request received to add note.`);

  const { title, text } = req.body;

  // If statement to make sure all required properties are present
  if (title && text) {
    const newNote = {
      id: uuid(),
      title,
      text,
    };

    // Obtain existing notes
    fs.readFile ('./db/db.json', 'utf8', (err, data) => {
      // Handle if readFile returns an error
      if (err) {
        res.status(500).json(err);
      } else {
        // Convert note string into JSON object
        const parsedNotes = JSON.parse(data);

        // Tack on new note
        parsedNotes.push(newNote);

        // Overwrite old db.json with new db.json that has new note. Feels overly resource intensive
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes),(writeErr) => 
        writeErr 
          ? res.status(500).json(writeErr) 
          : res.status(201).json('Successfully updated notes db.json')
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else { 
    res.status(500).json('Error in posting note');
  }
});

app.delete('/api/notes:id', (req,res) => {
  fs.readFile ('./db/db.json', 'utf8', (err, data) => {
    // Handle if readFile returns an error
    if (err) {
      res.status(500).json(err);
    } else {
      // Saving the db.json as a variable
      const parsedNotes = JSON.parse(data);
      // returns everything that doesn't match the ID
      const remainingNotes = parsedNotes.filter(note => note.id !== req.params.id)
      fs.writeFile('./db/db.json', JSON.stringify(remainingNotes), (writeErr) => 
        writeErr
        ? res.status(500).json(writeErr) 
        : res.status(200).json('Successfully deleted a note in db.json')
    )};
  });
})

app.get('*', (req,res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//create port to listen to for testing
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));