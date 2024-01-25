const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const toursFilePath = './data/tours.json';

// Read existing tours from the JSON file
let tours = [];
if (fs.existsSync(toursFilePath)) {
    const toursData = fs.readFileSync(toursFilePath, 'utf-8');
    tours = JSON.parse(toursData);
}

// Middleware to write tours to the file after each operation
function writeToursToFile() {
    fs.writeFileSync(toursFilePath, JSON.stringify(tours, null, 2), 'utf-8');
}

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contacts page
app.get('/contacts', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});

// About page 
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Get all tours
app.get('/tours', (req, res) => {
    res.json(tours);
});

// Get a specific tour by ID
app.get('/tours/:id', (req, res) => {
    const tourId = parseInt(req.params.id);
    const tour = tours.find(t => t.id === tourId);

    if (tour) {
        res.json(tour);
    } else {
        res.status(404).json({ message: 'Tour not found' });
    }
});

// Create a new tour
app.post('/tours', (req, res) => {
    const newTour = req.body;
    newTour.id = tours.length + 1;

    tours.push(newTour);
    writeToursToFile();

    res.status(201).json(newTour);
});

// Update an existing tour by ID
app.put('/tours/:id', (req, res) => {
    const tourId = parseInt(req.params.id);
    const updatedTour = req.body;

    const index = tours.findIndex(t => t.id === tourId);

    if (index !== -1) {
        tours[index] = { ...tours[index], ...updatedTour };
        writeToursToFile();
        res.json(tours[index]);
    } else {
        res.status(404).json({ message: 'Tour not found' });
    }
});

// Delete a tour by ID
app.delete('/tours/:id', (req, res) => {
    const tourId = parseInt(req.params.id);
    const index = tours.findIndex(t => t.id === tourId);

    if (index !== -1) {
        const deletedTour = tours.splice(index, 1);
        writeToursToFile();
        res.json(deletedTour[0]);
    } else {
        res.status(404).json({ message: 'Tour not found' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
