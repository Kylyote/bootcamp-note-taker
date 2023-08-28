// Server code to handle serving website and background logic
// add variables
const express = require('express');
const path = require('path');
const fs = require('fs');

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

// Get request for notes, maybe don't need? 
// app.get('/notes', (req,res) => {
//   // send message to client
//   res.status(200).json(`${req.method} request received to get notes.`);
//   res.sendFile('')
//   //Log request to server terminal
//   console.info(`${req.method} request received to get notes.`);
// });

// Post request to add note to db
app.post('/api/notes', (req,res) => {
  // Log to server terminal that a POST request was received
  console.info(`${req.method} request received to add note.`);

  const { title, text } = req.body;

  // If statement to make sure all required properties are present
  if (title && text) {
    const newNote = {
      title,
      text,
    };

    // Obtain existing notes
    fs.readFile ('./db/db.json', 'utf8', (err, data) => {
      // Handle if readFile returns an error
      if (err) {
        console.error(err);
      } else {
        // Convert note string into JSON object
        const parsedNotes = JSON.parse(data);

        // Tack on new note
        parsedNotes.push(newNote);

        // Overwrite old db.json with new db.json that has new note. Feels overly resource intensive
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes),(writeErr) => 
        writeErr 
          ? console.error(writeErr) 
          : console.info('Successfully updated notes list')
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


//create port to listen to for testing
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));