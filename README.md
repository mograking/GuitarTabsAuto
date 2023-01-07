# Guitar Tabs Auto  

Guitar Tabs Auto is a webapp where users can edit guitar tablature and hit build+play to play the music derived from their written tablature.  
Frontend is built with reactjs, and bulma. Backend is an expressjs nodejs server. A python script uses [sox](https://linux.die.net/man/1/sox) to create sound files using `.tabs` files as input.  
For each guitar string I've recorded frets from open string all the way to the 13th fret. Therefore 84 individual notes have been recorded as the raw material for the python script to utilize in creating the music.

### Requirements

Server must have sox installed in addition to the usual (python, npm).
To run : `npm start` website will be hosted on localhost:3000
