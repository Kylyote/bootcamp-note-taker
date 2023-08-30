# Basic Note Taker

## Summary

Writing backend to for a note taking website that will be deployed to Heroku.

## Sources

- Activity 18 and 20
- Study groups with Chelsea and Donnie

## Description

When server.js is run, either locally or on the Heroku service, it allows index.html and notes.html to run properly. Even linking from index.html to notes.html requires the server.js to be running. Once the web page is running, index.js will be served to the client which will enable all the buttons and features of the page to function as intended. Save is in the upper right along with a "+" which will bring up a spot for a new note to be written; this is only needed when a save note is viewed. The delete buttons will remove the note from the webpage and db.json.

## User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Credits

- Donnie Rawlings: https://github.com/drawlin22
- Chelsea Wagner: https://github.com/caf62219

## Links

Link to repo:  
https://github.com/Kylyote/bootcamp-note-taker  
Link to Heroku deploy:  
https://bootcamp-note-taker-deploy-a92a3c1d84fd.herokuapp.com/
